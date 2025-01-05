import styles from "@/styles/Toolbar.module.css";
import Microphone from "@/components/Toolbar/Microphone";
import Inspiration from "@/components/Toolbar/Inspiration";
import Briefcase from "@/components/Toolbar/Wardrobe";
import Prompt from "@/components/Toolbar/Prompt";
import Dropdown from "@/components/Dropdown/Dropdown";
import BottomTabs from "@/components/BottomTabs";
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
