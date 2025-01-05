"use client";
import { Button } from "@nextui-org/react";
import styles from "@/src/styles/Home.module.css";
import Head from "next/head";
import { auth } from "@/src/firebase";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "@/src/providers/auth-provider";
import { signInAnonymously } from "firebase/auth";

export default () => {
  const router = useRouter();

  const onPressContinue = () => {
    signInAnonymously(auth)
      .then((value) => {
        console.log(value);
        router.push("/select-assistant");
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      <Head>
        <title>voice-ai react</title>
        <meta name="description" content="voice-ai react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`justify-center ${styles.main} m-5`}>
        <h1 className="text-3xl text-center my-8 ">
          Hi lets get started with your outfit
        </h1>
        <Button onPress={onPressContinue} color="primary">
          Continue
        </Button>
      </main>
    </>
  );
};
