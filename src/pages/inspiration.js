import Head from "next/head";
import styles from "@/src/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import ImageCard from "@/src/components/ImageCard";
import FileUploader from "@/src/components/FileUploader";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function Home() {
  const router = useRouter();
  const controller = new AbortController();
  const signal = controller.signal;
  const onAssistantPress = () => {
    fetch("/api/thread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
      signal, // Pass the signal option to the fetch request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        router.push(`/threads/${response.thread.id}`);
      });
  };

  const [assistants, setAssistants] = useState([
    {
      title: "Outfit assitant",
      img: "https://avatar.iran.liara.run/public",
    },
  ]);
  return (
    <>
      <Head>
        <title>voice-ai react</title>
        <meta name="description" content="voice-ai react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1 className="text-3xl text-center my-8 ">Inspiration</h1>
        <FileUploader></FileUploader>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-4">
          {assistants.map((item, index) => (
            <ImageCard
              key={index}
              item={item}
              onPress={onAssistantPress}
            ></ImageCard>
          ))}
        </div>
        <div className="flex flex-col justify-items-stretch gap-3 w-full">
          <Button variant="solid" color="primary" className="justify-items-stretch  mx-10" onPress={()=>router.back()}>Back</Button>
        </div>
      </main>
    </>
  );
}
