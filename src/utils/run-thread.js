import OpenAI from "openai";
const openai = new OpenAI();
export const runThread = async (threadId) => {
  {
    return new Promise(async (resolve, reject) => {
      await openai.beta.threads.runs
        .stream(threadId, {
          assistant_id: "asst_yrpXQAG0Jf88t3pyirrSisUD",
        })
        .on("messageDone", (data) => {
          console.log("messageDone", JSON.stringify({ data }));
          resolve(data);
        });
    });
  }
};
