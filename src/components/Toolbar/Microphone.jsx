import React from "react";
import { Mic } from "react-feather";
import styles from "@/styles/Toolbar.module.css";
import { Button } from "@nextui-org/react";
const Microphone = ({
  activityDetection: activityDetection,
  handleMicrophoneSubmit: handleMicrophoneSubmit,
}) => {
  let borderStyle;

  switch (activityDetection) {
    case 1:
      borderStyle = "border-1	 border-solid	 border-amber-200	";
      break;
    case 2:
      borderStyle = "border-1	 border-solid	 border-red-600	";
      break;
    case 3:
      borderStyle = "border-1	 border-solid	 border-slate-500	";
      break;
    default:
      borderStyle = "border-0	";
      break;
  }

  return (
    <Button
      className={`${borderStyle}`}
      isIconOnly
      onPress={(e) => handleMicrophoneSubmit(e)}
      aria-label="Turn on mic"
      color="warning"
      variant="faded"
    >
      <Mic size={24} />
    </Button>
  );
};

export default Microphone;
