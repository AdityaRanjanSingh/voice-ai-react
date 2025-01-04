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
      borderStyle = "3px solid orange";
      break;
    case 2:
      borderStyle = "3px solid red";
      break;
    case 3:
      borderStyle = "3px solid var(--blackA10);";
      break;
    default:
      borderStyle = "";
      break;
  }

  return (
    <Button
      className={styles.ToolbarButtonMicrophone}
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
