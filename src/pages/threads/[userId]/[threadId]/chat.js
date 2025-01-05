import Head from "next/head";
import styles from "@/src/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Console from "@/src/components/Console";
import { useRouter } from "next/router";

const MediaStreamWrapper = ({ children }) => {
  const [userMediaStream, setUserMediaStream] = useState(null);

  useEffect(() => {
    // Initialize getUserMedia on component mount
    const initMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setUserMediaStream(stream);
    };

    initMediaStream();
  }, []);

  return children({ userMediaStream, setUserMediaStream });
};

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.threadId && router.query.userId) {
      try {
        fetch(`/api/${router.query.userId}/${router.query.threadId}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            threadId,
            voiceId: voiceId.current,
            audio: audio ? audio : null,
            messages: (() => {
              // remove audio from sessionMessages.current
              let messages = [];
              for (let i = 0; i < sessionMessages.current.length; i++) {
                if (sessionMessages.current[i].content.length > 0) {
                  messages.push({
                    role: sessionMessages.current[i].role,
                    content: sessionMessages.current[i].content,
                  });
                }
              }
              return messages;
            })(),
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((response) => {})
          .catch((error) => {});
      } catch (error) {}
    }
  }, [router.query.userId,router.query.threadId]);

  return (
    <>
      <Head>
        <title>voice-ai react</title>
        <meta name="description" content="voice-ai react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <MediaStreamWrapper>
          {({ userMediaStream }) => (
            <Console
              className="h-full"
              userMediaStream={userMediaStream}
              threadId={router.query.threadId}
              userId={router.query.userId}
            ></Console>
          )}
        </MediaStreamWrapper>
      </main>
    </>
  );
}
