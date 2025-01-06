"use client";
import Head from "next/head";
import styles from "@/src/styles/Home.module.css";
import React, { useState, useEffect, useContext } from "react";
import ImageCard from "@/src/components/ImageCard";
import FileUploader from "@/src/components/FileUploader";
import uploadFile from "@/utils/upload-file";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { AuthContext } from "@/src/providers/auth-provider";
import { firestore, storage } from "@/src/firebase";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function Home() {
  const router = useRouter();
  const controller = new AbortController();
  const signal = controller.signal;
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user.uid) return;
    const getPhotos = async () => {
      const collRef = collection(firestore, "inspiration");

      const queryRef = query(collRef, where("userId", "==", user.uid));
      await getDocs(queryRef)
        .then((value) => {
          const existing = value.docs.map((d) => d.data());
          setPhotos((pho) => [...pho, ...existing]);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getPhotos();
  }, [user.uid]);
  const [photos, setPhotos] = useState([
    {
      image: "https://nextui.org/images/hero-card.jpeg",
      fullPath: "initial",
    },
  ]);
  const onUploadFile = async (image) => {
    if (image === null) return;
    const path = `inspiration/${user.uid}/${image.name}`;
    const response = await uploadFile(image, path);
    await addDoc(collection(firestore, "inspiration"), {
      fullPath: response.fullPath,
      userId: user.uid,
    }).catch((error) => toast.error(error.message));
    setPhotos((a) => [...a, { image: response.url, name: response.fullPath }]);
    toast.success("Wow so easy!", {
      position: "bottom-center",
      theme: "colored",
    });
  };
  const deleteFile = (image) => {
    setPhotos((photos) =>
      photos.filter((item) => item.fullPath !== image.fullPath)
    );
    const imageRef = storageRef(
      storage,
      `inspiration/${user.uid}/${image.fullPath}`
    );
    deleteObject(imageRef).then(() =>
      toast.success("Deleted", {
        position: "bottom-center",
        theme: "colored",
      })
    );
  };

  return (
    <>
      <h1 className="text-3xl text-center my-8 ">Inspiration</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-4">
        {photos.map((item, index) => (
          <ImageCard key={index} item={item} onDelete={deleteFile}></ImageCard>
        ))}
      </div>
      <div className="flex flex-col justify-items-stretch gap-3 w-full p-4">
        <FileUploader onPress={(data) => onUploadFile(data[0])}></FileUploader>

        <Button
          variant="solid"
          color="primary"
          className="justify-items-stretch"
          onPress={() => router.back()}
        >
          Back
        </Button>
      </div>
    </>
  );
}
