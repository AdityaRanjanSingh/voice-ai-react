import { Tabs, Tab, Button } from "@nextui-org/react";
import Microphone from "../Toolbar/Microphone";
import { Mic } from "react-feather";

import { CameraIcon, HeartIcon } from "@/icons";

export default function App({
  activityDetection,
  onPressMic,
  onPressWardrobe,
  onPressInspiration,
}) {
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
    <div
      className="flex w-full flex-col py-5"
     
    >
      <Tabs
        className="justify-center h-20"
        aria-label="Options"
        color="none"
        variant="bordered"
      >
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <Button
                isIconOnly
                aria-label="Take a photo"
                color="warning"
                variant="faded"
                onPress={onPressWardrobe}
              >
                <Mic size={24} />
              </Button>
            </div>
          }
        />
        <Tab
          key="mic"
          title={
            <div className="flex items-center space-x-2">
              <Button
                isIconOnly
                onPress={(e) => onPressMic(e)}
                aria-label="Turn on mic"
                color="warning"
                variant="faded"
                style={borderStyle}
              >
                <Mic size={24} />
              </Button>
            </div>
          }
        />
        <Tab
          key="inspiration"
          title={
            <Button
              isIconOnly
              onPress={onPressInspiration}
              aria-label="Inpiration"
              variant="faded"
            >
              <Mic size={24} />
            </Button>
          }
        />
      </Tabs>
    </div>
  );
}
