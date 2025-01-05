"use client";
import Head from "next/head";
import styles from "@/src/styles/Home.module.css";
import React, { useState, useEffect, useContext } from "react";
import ImageCard from "@/src/components/ImageCard";
import FileUploader from "@/src/components/FileUploader";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { AuthContext } from "@/src/providers/auth-provider";
import { storage } from "@/src/firebase";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const controller = new AbortController();
  const signal = controller.signal;
  const { user } = useContext(AuthContext);

  const [photos, setPhotos] = useState([
    {
      image: "https://nextui.org/images/hero-card.jpeg",
      name: "initial",
    },
  ]);
  const uploadFile = (image) => {
    if (image === null) return;
    const imageRef = storageRef(storage, `wardrobe/${user.uid}/${image.name}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setPhotos((a) => [...a, { image: url, name: image.name }]);
            toast.success("Wow so easy!", {
              position: "bottom-center",
              theme: "colored",
            });
          })
          .catch((error) => {
            console.error(error.message);
            toast.error(error.message, {
              position: "bottom-center",
              theme: "colored",
            });
          });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          theme: "colored",
        });
      });
  };
  const deleteFile = (image) => {
    setPhotos((photos) => photos.filter((item) => item.name !== image.name));
    const imageRef = storageRef(storage, `wardrobe/${user.uid}/${image.name}`);
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
        <FileUploader onPress={uploadFile}></FileUploader>

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
