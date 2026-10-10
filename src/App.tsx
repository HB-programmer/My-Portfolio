import { useState, type ReactNode } from "react";
import { AiLab } from "./components/AiLab";
import { Blogs } from "./components/Blogs";
import { BootScreen } from "./components/BootScreen";
import { Contact } from "./components/Contact";
import { Dashboard } from "./components/Dashboard";
import { Education } from "./components/Education";
import { EngineRoom } from "./components/EngineRoom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { Projects } from "./components/Projects";
import { RecruiterBrief } from "./components/RecruiterBrief";
import { RiderProfile } from "./components/RiderProfile";
import { Skills } from "./components/Skills";
import { Speedometer } from "./components/Speedometer";
import { TelemetrySection } from "./components/TelemetrySection";
import { useReveal } from "./hooks/useReveal";
import { useSectionDepth } from "./hooks/useSectionDepth";
import { useSpeedometer } from "./hooks/useSpeedometer";
import { readInitialMode, saveMode } from "./lib/visitorMode";
import type { VisitorMode } from "./types/portfolio";

function App() {
  const [bootVisible, setBootVisible] = useState(true);
  const [selectedMode, setSelectedMode] = useState<VisitorMode | null>(readInitialMode);
  const mode = selectedMode ?? "explorer";
  const ignited = !bootVisible;
  const { angle, speed } = useSpeedometer();
  useReveal(mode);
  useSectionDepth(mode);

  const chooseMode = (next: VisitorMode) => {
    setSelectedMode(next);
    saveMode(next);
  };

  const toggleMode = () => {
    chooseMode(mode === "recruiter" ? "explorer" : "recruiter");
    window.scrollTo({ top: 0 });
  };

  // Recruiters get the brief first and only the sections that matter for hiring.
  const sections: ReactNode =
    mode === "recruiter" ? (
      <>
        <RecruiterBrief ignited={ignited} onSwitchMode={toggleMode} />
        <Projects />
        <Journey />
        <Skills />
        <AiLab />
        <Blogs />
        <Education />
        <Contact />
      </>
    ) : (
      <>
        <Hero ignited={ignited} />
        <RiderProfile />
        <Dashboard />
        <TelemetrySection />
        <Journey />
        <Projects />
        <EngineRoom />
        <Skills />
        <AiLab />
        <Blogs />
        <Education />
        <Contact />
      </>
    );

  return (
    <>
      <BootScreen
        visible={bootVisible}
        mode={selectedMode}
        onModeChange={chooseMode}
        onComplete={() => setBootVisible(false)}
      />
      <Header mode={mode} onToggleMode={toggleMode} />
      <main>{sections}</main>
      {mode === "explorer" && <Speedometer speed={speed} angle={angle} />}
      <Footer />
    </>
  );
}

export default App;
