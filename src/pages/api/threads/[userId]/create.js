import app from "@/src/server.firebase";
import { Effect, pipe } from "effect";

import { getFirestore } from "firebase-admin/firestore";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { z } from "zod";

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_AWS_POLLY_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_AWS_POLLY_SECRET_KEY,
});

require("dotenv").config({
  path: "./.env",
});

const { OpenAI } = require("openai");

const openai = new OpenAI();
const getImages = (parsed, name) =>
  pipe(
    Effect.tryPromise(() => {
      return getFirestore()
        .collection(name)
        .where("userId", "==", parsed.query.userId)
        .get();
    }),
    Effect.andThen((data) => data.docs.map((item) => item.data())),
    Effect.andThen((docs) =>
      Effect.forEach(docs, (item) =>
        Effect.tryPromise({
          try: () => {
            const fileRef = getStorage()
              .bucket("gs://rightly-8a3fd.firebasestorage.app")
              .file(docs[0].fullPath);
            return getDownloadURL(fileRef);
          },
          catch: (error) => Effect.logError(error),
        })
      )
    )
  );

const addImagesToThread = (threadId, images, name) =>
  openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: [
      {
        type: "text",
        text: `Here is users ${name} collection`,
      },
      ...images.map((image) => ({
        type: "image_url",
        image_url: { url: image },
      })),
    ],
  });
export default async function handler(req, res) {
  await app();

  const sessionResponse = {
    thread: null,
    transcription: null,
    chatResponse: null,
    audioResponse: null,
    messages: [],
  };

  return await Effect.runPromise(
    pipe(
      Effect.log("Starting Run", sessionResponse),
      Effect.andThen(() => {
        return z
          .object({
            query: z.object({
              userId: z.string(),
            }),
          })
          .parse(req);
      }),
      Effect.andThen((parsed) =>
        Effect.all([
          getImages(parsed, "inspiration"),
          getImages(parsed, "wardrobe"),
          Effect.tryPromise(() => openai.beta.threads.create()),
        ])
      ),
      Effect.andThen(([inspirationImages, wardrobeImages, thread]) =>
        Effect.all([
          Effect.sync(() => thread),
          Effect.tryPromise({
            try: () => addImagesToThread(thread.id, wardrobeImages, "wardrobe"),
            catch: (error) => Effect.logError(error),
          }),
          Effect.tryPromise({
            try: () =>
              addImagesToThread(thread.id, inspirationImages, "inpiration"),
            catch: (error) => Effect.logError(error),
          }),
        ])
      ),
      Effect.tap(([response]) => Effect.log("Response", response)),
      Effect.andThen(([response]) => (sessionResponse.thread = response)),
      Effect.tap(() => Effect.log("SessionResponse", sessionResponse)),
      Effect.andThen((response) => res.status(200).json(sessionResponse))
    )
  );
}
