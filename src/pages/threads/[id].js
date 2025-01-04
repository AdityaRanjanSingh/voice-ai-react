import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Console from "@/components/Console";
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
    if (router.query.id) {
      try {
        fetch("/api/chat", {
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
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>voice-ai react</title>
        <meta name="description" content="voice-ai react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <MediaStreamWrapper>
            {({ userMediaStream }) => (
              <>
                <Console
                  userMediaStream={userMediaStream}
                  threadId={router.query.id}
                ></Console>
              </>
            )}
          </MediaStreamWrapper>
        </div>
      </main>
    </>
  );
}
