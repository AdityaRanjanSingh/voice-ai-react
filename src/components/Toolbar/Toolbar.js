import styles from "@/src/styles/Toolbar.module.css";
import Microphone from "@/src/components/Toolbar/Microphone";
import Inspiration from "@/src/components/Toolbar/Inspiration";
import Briefcase from "@/src/components/Toolbar/Wardrobe";
import Prompt from "@/src/components/Toolbar/Prompt";
import Dropdown from "@/src/components/Dropdown/Dropdown";
import BottomTabs from "@/src/components/BottomTabs";
import { useRouter } from "next/router";
const Toolbar = ({
  activityDetection: activityDetection,
  handleMicrophoneSubmit: handleMicrophoneSubmit,
  currentSession: currentSession,
  detectionSettings: detectionSettings,
  setDetectionSettings: setDetectionSettings,
  voiceNames: voiceNames,
  voiceId: voiceId,
  selectedPrompt: selectedPrompt,
  rerender: rerender,
  setRerender: setRerender,
  sessionMessages: sessionMessages,
  setActivityDetection: setActivityDetection,
  promptOpen: promptOpen,
  setPromptOpen: setPromptOpen,
  micQuiet: micQuiet,
  resetPlaceholderPrompt: resetPlaceholderPrompt,
  promptSettings: promptSettings,
}) => {
  const router = useRouter();
  return (
    <div className={"flex flex-row justify-center gap-5 my-5"}>
      {/* <Dropdown
        currentSession={currentSession}
        detectionSettings={detectionSettings}
        setDetectionSettings={setDetectionSettings}
        voiceNames={voiceNames}
        voiceId={voiceId}
        activityDetection={activityDetection}
        handleMicrophoneSubmit={handleMicrophoneSubmit}
        selectedPrompt={selectedPrompt}
        rerender={rerender}
        setRerender={setRerender}
        sessionMessages={sessionMessages}
        setActivityDetection={setActivityDetection}
        promptOpen={promptOpen}
        setPromptOpen={setPromptOpen}
        micQuiet={micQuiet}
        resetPlaceholderPrompt={resetPlaceholderPrompt}
        promptSettings={promptSettings}
      ></Dropdown> */}
      <Briefcase
        activityDetection={activityDetection}
        handleMicrophoneSubmit={() => router.push("/wardrobe")}
      />
      <Microphone
        activityDetection={activityDetection}
        handleMicrophoneSubmit={handleMicrophoneSubmit}
      />
      <Inspiration
        selected={true}
        activityDetection={activityDetection}
        handleMicrophoneSubmit={() => router.push("/inspiration")}
      />
      {/* <Prompt
        selectedPrompt={selectedPrompt}
        rerender={rerender}
        setRerender={setRerender}
        promptOpen={promptOpen}
        setPromptOpen={setPromptOpen}
      /> */}
    </div>
  );
};

export default Toolbar;
