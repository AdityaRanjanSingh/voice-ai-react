import React from "react";
import { Briefcase, Heart } from "react-feather";
import styles from "@/styles/Toolbar.module.css";
import { Button } from "@nextui-org/react";
const Microphone = ({
  activityDetection: activityDetection,
  handleMicrophoneSubmit: handleMicrophoneSubmit,
  selected,
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
      borderStyle = "border-1	 border-solid	 border-slate-500	back";
      break;
    default:
      borderStyle =
        "border-1	border-solid border-slate-500 rounded-full h-15 w-15";
      break;
  }

  return (
    <Button
      isIconOnly
      onPress={(e) => handleMicrophoneSubmit(e)}
      aria-label="Turn on mic"
      variant={selected ? "solid" : "faded"}
    >
      <Briefcase className="m-2" size={30} />
    </Button>
  );
};

export default Microphone;
