import { storage } from "@/src/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadFile = async (image, path) => {
  if (image === null) return;
  const imageRef = ref(storage, path);
  const response = await uploadBytes(imageRef, image);
  const url = await getDownloadURL(response.ref);
  return { url, fullPath: imageRef.fullPath };
};
export default uploadFile;
