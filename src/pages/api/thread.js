import { Effect, pipe } from "effect";

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

export default async function handler(req, res) {
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
      Effect.andThen(() => openai.beta.threads.create()),
      Effect.tap((response) => Effect.log("Response", response)),
      Effect.andThen((response) => (sessionResponse.thread = response)),
      Effect.tap(() => Effect.log("SessionResponse", sessionResponse)),
      Effect.andThen((response) => res.status(200).json(sessionResponse))
    )
  );
}
