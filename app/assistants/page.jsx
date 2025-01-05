"use client";
import Head from "next/head";
import styles from "@/src/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import AssistantCard from "@/src/components/AssistantCard";
import { useRouter } from "next/navigation";
import { auth } from "@/src/firebase";

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
    <main className={styles.main}>
      <div className="gap-2 grid m-5">
        {assistants.map((item, index) => (
          <AssistantCard
            key={index}
            item={item}
            onPress={onAssistantPress}
          ></AssistantCard>
        ))}
      </div>
    </main>
  );
}
