import { useFaceTracking } from './hooks/useFaceTracking';
import { Navbar } from './components/ui/Navbar';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { FaceTrackToggle } from './components/ui/FaceTrackToggle';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';

function App() {
  const {
    rotation,
    blendshapes,
    isTracking,
    isEnabled,
    faceDetected,
    error,
    toggleTracking
  } = useFaceTracking();

  return (
    <div className="relative">
      {/* Navigation */}
      <Navbar />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Face Tracking Toggle */}
      <FaceTrackToggle
        isEnabled={isEnabled}
        isTracking={isTracking}
        faceDetected={faceDetected}
        error={error}
        onToggle={toggleTracking}
      />

      {/* Page Sections */}
      <main>
        <HeroSection rotation={rotation} blendshapes={blendshapes} isTracking={isTracking} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
