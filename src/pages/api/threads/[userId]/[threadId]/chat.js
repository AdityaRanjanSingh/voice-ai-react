import { runThread } from "@/src/utils/run-thread";
import { Effect, pipe } from "effect";
import * as zod from "zod";
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_AWS_POLLY_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_AWS_POLLY_SECRET_KEY,
});

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: "v4",
  region: "us-east-1",
});

require("dotenv").config({
  path: "./.env",
});

const { OpenAI } = require("openai");

const openai = new OpenAI();

export default async function handler(req, res) {
  const parsed = zod
    .object({
      query: zod.object({
        threadId: zod.string(),
        userId: zod.string(),
      }),
      body: zod.object({
        audio: zod.any().nullable(),
        threadId: zod.string(),
        voiceId: zod.any(),
        messages: zod.array(zod.any()),
      }),
    })
    .safeParse(req);

  // if (req.body.audio) {
  //   const audio = req.body.audio;
  //   const base64 = audio.split(",")[1];
  //   const buf = Buffer.from(base64, "base64");
  //   buf.name = "sound.webm";
  //   const transcription = await openai.audio.transcriptions.create({
  //     file: audio,
  //     model: "whisper-1",
  //   });

  //   console.log(transcription.text);

  //   sessionResponse.transcription = transcription.text;
  //   sessionResponse.messages.push({
  //     role: "user",
  //     content: sessionResponse.transcription,
  //   });
  // }

  //           const audioBuffer = Buffer.from(data.AudioStream);
  //           const audioDataURI = `data:${
  //             data.ContentType
  //           };base64,${audioBuffer.toString("base64")}`;
  //           data.audioDataURI = audioDataURI;

  //           sessionResponse.audio = data;

  // res.status(200).json(sessionResponse);
  const sessionResponse = {
    threadId: parsed.data.query.threadId,
    transcription: null,
    chatResponse: null,
    audioResponse: null,
    messages: parsed.data.body.messages,
  };
  return await Effect.runPromise(
    pipe(
      Effect.sync(() => Effect.log("Starting Run", parsed.data)),
      Effect.andThen(() =>
        Effect.tryPromise({
          try: () =>
            openai.beta.threads.messages.create(sessionResponse.threadId, {
              role: sessionResponse.messages[
                sessionResponse.messages.length - 1
              ].role,
              content:
                sessionResponse.messages[sessionResponse.messages.length - 1]
                  .content,
            }),
          catch: (error) => Effect.logError(error),
        })
      ),
      Effect.andThen(() =>
        Effect.tryPromise({
          try: () => runThread(sessionResponse.threadId),
          catch: (error) => Effect.logError(error),
        })
      ),
      Effect.tap((response) => Effect.log("Response", response)),
      Effect.andThen((response) =>
        sessionResponse.messages.push({
          ...response,
          content: response.content[0]["text"]["value"],
        })
      ),
      Effect.tap(() => Effect.log("SessionResponse", sessionResponse)),
      Effect.andThen((response) => ({
        ...sessionResponse,
        chatResponse: [
          {
            role: response.role,
            content: response.content,
          },
        ],
      })),
      Effect.andThen((response) => res.status(200).json(response))
    )
  );

  // try {
  //   openai
  //     .createChatCompletion({
  //       model: "gpt-3.5-turbo",
  //       messages: sessionResponse.messages,
  //     })
  //     .then((data) => {
  //       sessionResponse.messages.push({
  //         role: data.data.choices[data.data.choices.length - 1].message.role,
  //         content:
  //           data.data.choices[data.data.choices.length - 1].message.content,
  //       });
  //       sessionResponse.chatResponse = data.data.choices;
  //       let params = {
  //         Text: data.data.choices[data.data.choices.length - 1].message.content,
  //         OutputFormat: "mp3",
  //         VoiceId: req.body.voiceId || "Joanna",
  //         Engine: "neural",
  //       };
  //       //      console.log(params);
  //       Polly.synthesizeSpeech(params, (err, data) => {
  //         if (err) {
  //           console.log("Error synthesizing speech:", err);
  //           res.status(500).json({ error: err });
  //         } else if (data) {
  //           const audioBuffer = Buffer.from(data.AudioStream);
  //           const audioDataURI = `data:${
  //             data.ContentType
  //           };base64,${audioBuffer.toString("base64")}`;
  //           data.audioDataURI = audioDataURI;

  //           sessionResponse.audio = data;
  //           // console.log("Session response:", sessionResponse);
  //           res.status(200).json(sessionResponse);
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("Error creating chat completion:", err);
  //       res.status(500).json({ error: err });
  //     });
  // } catch (err) {
  //   console.log("Error creating chat completion:", err);
  //   res.status(500).json({ error: err });
  // }
}
