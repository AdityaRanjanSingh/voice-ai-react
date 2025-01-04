import styles from "@/styles/Toolbar.module.css";
import Microphone from "@/components/Toolbar/Microphone";
import Prompt from "@/components/Toolbar/Prompt";
import Dropdown from "@/components/Dropdown/Dropdown";

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
  return (
    <div className={styles.Toolbar}>
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
      <Microphone
        activityDetection={activityDetection}
        handleMicrophoneSubmit={handleMicrophoneSubmit}
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
