import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import AssistantCard from "@/components/AssistantCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
        <h1 className="text-3xl text-center my-8 ">Choose an assistant</h1>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {assistants.map((item, index) => (
            <AssistantCard
              key={index}
              item={item}
              onPress={() => router.push("/thread")}
            ></AssistantCard>
          ))}
        </div>
      </main>
    </>
  );
}
