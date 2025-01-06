"use client";

import React, { useState, useEffect, useContext } from "react";
import ImageCard from "@/src/components/ImageCard";
import FileUploader from "@/src/components/FileUploader";
import uploadFile from "@/utils/upload-file";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { AuthContext } from "@/src/providers/auth-provider";
import { firestore, storage } from "@/src/firebase";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function Home() {
  const router = useRouter();
  const controller = new AbortController();
  const signal = controller.signal;
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!user.uid) return;
    const getPhotos = async () => {
      const collRef = collection(firestore, "wardrobe");

      const queryRef = query(collRef, where("userId", "==", user.uid));
      const response = await getDocs(queryRef)
        // .then((value) => {
        //   const existing = value.docs.map((d) => d.data());
        //   setPhotos((pho) => [...pho, ...existing]);
        // })
        .catch((error) => {
          console.error(error);
        });

      const images = response.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      setPhotos((existing) => [...existing, ...images]);
    };
    getPhotos();
  }, [user.uid]);
  const onUploadFile = async (images) => {
    if (!images.length) return;
    images.map(async (image) => {
      const path = `wardrobe/${user.uid}/${image.name}`;
      const response = await uploadFile(image, path);
      const reponeDoc = await addDoc(collection(firestore, "wardrobe"), {
        fullPath: response.fullPath,
        userId: user.uid,
      }).catch((error) => toast.error(error.message));
      setPhotos((a) => [
        ...a,
        { userId: user.uid, fullPath: response.fullPath, id: reponeDoc.id },
      ]);
      toast.success("Wow so easy!", {
        position: "bottom-center",
        theme: "colored",
      });
    });
  };
  const deleteFile = async (image) => {
    setPhotos((photos) =>
      photos.filter((item) => item.fullPath !== image.fullPath)
    );
    const imageRef = storageRef(storage, image.fullPath);
    await deleteObject(imageRef);
    await deleteDoc(doc(firestore, "wardrobe", image.id));
    toast.success("Deleted", {
      position: "bottom-center",
      theme: "colored",
    });
  };

  return (
    <>
      <h1 className="text-3xl text-center my-8 ">Wardrobe</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-4">
        {photos.map((item, index) => (
          <ImageCard
            key={index}
            item={item}
            onDelete={() => deleteFile(item)}
          ></ImageCard>
        ))}
      </div>
      <div className="flex flex-col justify-items-stretch gap-3 w-full p-4">
        <FileUploader onPress={(data) => onUploadFile(data)}></FileUploader>

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
