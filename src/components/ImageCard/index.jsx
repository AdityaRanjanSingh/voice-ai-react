import { AuthContext } from "@/src/providers/auth-provider";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { deleteObject } from "firebase/storage";
import { useContext } from "react";

export default function App({ item, onDelete }) {
  const { user } = useContext(AuthContext);

  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src={item.image}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large w-[calc(100%_-_8px)] shadow-small ml-1 z-10 absolute bottom-0 left-0 right-0">
        <Button
          className="w-full"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
          onPress={onDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
