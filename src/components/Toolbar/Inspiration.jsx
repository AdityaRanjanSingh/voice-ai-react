import React from "react";
import { Mic, Heart } from "react-feather";
import styles from "@/src/styles/Toolbar.module.css";
import { Button } from "@nextui-org/react";
const Microphone = ({
  activityDetection: activityDetection,
  handleMicrophoneSubmit: handleMicrophoneSubmit,
  selected,
}) => {
  return (
    <Button
      isIconOnly
      onPress={(e) => handleMicrophoneSubmit(e)}
      aria-label="Turn on mic"
      color="warning"
      variant={selected ? "solid" : "faded"}
    >
      <Heart size={24} className="m-2" />
    </Button>
  );
};

export default Microphone;
