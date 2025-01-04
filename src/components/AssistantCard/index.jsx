import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function AssistantCard({ item, onPress }) {
  return (
    <Card isPressable shadow="sm" onPress={onPress}>
      <CardBody className="overflow-visible p-0">
        <Image
          alt={item.title}
          className="w-full object-cover h-[140px]"
          radius="lg"
          shadow="sm"
          src={item.img}
          width="100%"
        />
      </CardBody>
      <CardFooter className="text-small justify-center">
        <b>{item.title}</b>
      </CardFooter>
    </Card>
  );
}
