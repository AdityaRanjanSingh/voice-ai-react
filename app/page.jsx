"use client";
import { Button } from "@nextui-org/react";
import styles from "@/src/styles/Home.module.css";
import Head from "next/head";
import { auth } from "@/src/firebase";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/src/providers/auth-provider";

export default () => {
  const router = useRouter();
  const { signinAnonymously } = useContext(AuthContext);
  const onPressContinue = () => {
    signinAnonymously(auth)
      .then((value) => {
        console.log(value);
        router.push("/select-assistant");
      })
      .catch((e) => console.error(e));
  };
  return (
    <main className={`justify-center ${styles.main} m-5`}>
      <h1 className="text-3xl text-center my-8 ">
        Hi lets get started with your outfit
      </h1>
      <Button onPress={onPressContinue} color="primary">
        Continue
      </Button>
    </main>
  );
};
