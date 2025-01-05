"use client";
import styles from "@/src/styles/Home.module.css";
import React, { useState, useContext } from "react";
import ImageCard from "@/src/components/ImageCard";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { Button, Image } from "@nextui-org/react";
import Dropzone from "react-dropzone";
import { storage } from "@/src/firebase";
import { AuthContext } from "@/src/providers/auth-provider";
import { toast } from "react-toastify";
import { Listbox, ListboxItem } from "@nextui-org/react";

export const ListboxWrapper = ({ children }) => (
  <div className="w-full max-w-[350px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mb-50">
    {children}
  </div>
);

export function PhotosList({ items, onDelete }) {
  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Example with disabled actions"
        disabledKeys={["edit", "delete"]}
        onAction={(key) => console.log(key)}
        items={items}
        temp
      >
        {(item) => (
          <ListboxItem
            key={item.name}
            className={item.key === "delete" ? "text-danger" : ""}
            color={item.key === "delete" ? "danger" : "default"}
          >
            <Image
              alt="Woman listing to music"
              className="object-cover w-full shadow"
              src={item.image}
              height={300}
              width={300}
            />
            <Button
              className="w-full my-2"
              color="danger"
              radius="sm"
              size="sm"
              variant="flat"
              onPress={onDelete}
            >
              Delete
            </Button>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}

export default function Home() {
  const router = useRouter();
  const controller = new AbortController();
  const { user } = useContext(AuthContext);
  const onPhotoPress = () => {};
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
          position: "bottom-center",
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
    <main className={"flex flex-col"}>
      <div className="w-full h-full text-3xl text-center my-8">Wardrobe</div>
      <PhotosList items={photos}></PhotosList>
      <div className="flex flex-col  gap-3 w-full p-4 fixed bottom-0 left-0 right-0 z-10 bg-stone-50	shadow-md">
        <Dropzone onDrop={(acceptedFiles) => uploadFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="border-1 border-solid p-2">
                  Drop files or click here
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <Button
          variant="solid"
          color="default"
          className="w-full"
          onPress={() => router.back()}
        >
          Back
        </Button>
      </div>
    </main>
  );
}
