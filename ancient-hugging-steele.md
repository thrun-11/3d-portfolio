# Face-Tracked 3D Portfolio Website Implementation Plan

## Context

Building a modern, interactive portfolio website for Arnav Nidumolu (full-stack developer) featuring:
- Real-time face tracking that controls a 3D avatar model
- Single-page application with smooth scroll animations
- Minimalist light theme design
- Showcases professional experience from resume (Meta internship, founding Convo AI, AR filters, etc.)
- GLB model from Avaturn.me (13.4MB, located at `/Users/arnodorian/Downloads/model-3.glb`)

**Why this approach**: A face-tracked 3D avatar creates an engaging, memorable first impression that demonstrates technical capability while maintaining professionalism. The light theme ensures readability and broad appeal.

## Technical Stack

- **Framework**: Vite + React 18 + TypeScript
- **3D Rendering**: Three.js via React Three Fiber (@react-three/fiber)
- **3D Utilities**: @react-three/drei (for helpers, loaders, controls)
- **Face Tracking**: @mediapipe/tasks-vision (Face Landmarker)
- **Animations**: Framer Motion (UI) + Three.js (3D)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod validation

## Project Structure

```
3d-portfolio/
├── public/
│   └── model-3.glb                    # Copied from Downloads
├── src/
│   ├── components/
│   │   ├── Avatar3D.tsx               # Main 3D avatar component
│   │   ├── FaceTracker.tsx            # MediaPipe face tracking logic
│   │   ├── Scene.tsx                  # Three.js scene setup
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # Landing with 3D avatar
│   │   │   ├── AboutSection.tsx       # Professional summary
│   │   │   ├── ExperienceSection.tsx  # Timeline (Meta, Convo AI, etc.)
│   │   │   ├── ProjectsSection.tsx    # Key projects showcase
│   │   │   ├── SkillsSection.tsx      # Tech stack visualization
│   │   │   └── ContactSection.tsx     # Contact form
│   │   ├── ui/
│   │   │   ├── Navbar.tsx             # Fixed navigation
│   │   │   ├── FaceTrackToggle.tsx    # Camera permission toggle
│   │   │   └── ScrollProgress.tsx     # Scroll indicator
│   │   └── ScrollAnimations.tsx       # Intersection observer wrapper
│   ├── hooks/
│   │   ├── useFaceTracking.ts         # Face tracking state & logic
│   │   ├── useScrollAnimation.ts      # Scroll-triggered animations
│   │   └── useMediaQuery.ts           # Responsive breakpoints
│   ├── utils/
│   │   ├── faceToRotation.ts          # Map face landmarks to 3D rotation
│   │   └── portfolioData.ts           # Resume content as data
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Implementation Steps

### 1. Project Scaffolding
- Initialize Vite React TypeScript project: `npm create vite@latest 3d-portfolio -- --template react-ts`
- Install dependencies:
  ```bash
  npm install three @react-three/fiber @react-three/drei
  npm install @mediapipe/tasks-vision
  npm install framer-motion
  npm install -D tailwindcss postcss autoprefixer
  npm install lucide-react react-hook-form zod @hookform/resolvers
  ```
- Configure Tailwind CSS with light theme design tokens
- Copy GLB model from Downloads to `public/` directory

### 2. Portfolio Data Extraction
**File**: `src/utils/portfolioData.ts`

Extract resume information into structured data:
```typescript
export const personalInfo = {
  name: "Arnav Nidumolu",
  title: "Full Stack Developer",
  location: "Cupertino, CA",
  email: "[from resume]",
  phone: "[from resume]",
  linkedin: "[from resume]",
  github: "[from resume]"
}

export const experience = [
  {
    company: "Meta",
    role: "Software Engineering Intern",
    period: "Jun 2024 - Aug 2024",
    description: "Llama Team - Built ML models...",
    tech: ["PyTorch", "CUDA", "Python"]
  },
  {
    company: "Convo AI",
    role: "Founder & CEO",
    period: "Dec 2022 - Present",
    description: "AI-powered CRM platform...",
    tech: ["React", "Node.js", "MongoDB", "OpenAI"]
  }
  // ... more from resume
]

export const projects = [
  // Convo AI, WhatsApp Bot, AR Filters, etc.
]

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  frontend: ["React", "Next.js", "Tailwind", "Three.js"],
  backend: ["Node.js", "Express", "FastAPI", "MongoDB"],
  tools: ["Git", "Docker", "AWS", "Firebase"]
}
```

### 3. Face Tracking System
**File**: `src/hooks/useFaceTracking.ts`

Implement MediaPipe Face Landmarker:
- Initialize FaceLandmarker with camera stream
- Track face landmarks (468 points) at 30 FPS
- Calculate head rotation (pitch, yaw, roll) from facial geometry
- Return rotation values as Euler angles for Three.js
- Handle camera permissions gracefully
- Provide enable/disable toggle state

**File**: `src/utils/faceToRotation.ts`

Math utilities:
- Convert face landmarks to head rotation using nose, forehead, and chin points
- Smooth rotation with lerp/damping to avoid jittery movements
- Clamp rotation values to realistic head movement ranges
- Handle edge cases (face out of frame, multiple faces)

### 4. 3D Avatar Component
**File**: `src/components/Avatar3D.tsx`

- Load GLB model using `useGLTF` from drei
- Access head/neck bones from model skeleton
- Apply face tracking rotation to head bone
- Add subtle idle animation when face tracking is off (gentle breathing, small head movements)
- Implement smooth interpolation between tracked and idle states
- Add eye tracking if model supports it (look at cursor when face tracking off)

**File**: `src/components/Scene.tsx`

Three.js scene setup:
- Canvas with proper lighting (ambient + directional for light theme)
- Camera positioned to frame avatar nicely
- Subtle background gradient (light gray to white)
- Post-processing effects (optional: bloom, SSAO for depth)
- Responsive camera adjustments for mobile

### 5. Hero Section
**File**: `src/components/sections/HeroSection.tsx`

- Full viewport height
- 3D canvas on left/center (60% width desktop)
- Text content on right:
  - Name with typewriter effect
  - Title/tagline
  - Brief intro
  - CTA buttons (View Work, Contact)
- Face tracking toggle button (top-right)
- Scroll indicator at bottom
- Parallax effect on scroll

### 6. About Section
**File**: `src/components/sections/AboutSection.tsx`

- Professional summary from resume
- Personal photo/avatar (optional)
- Quick stats (years experience, projects shipped, etc.)
- Scroll-triggered fade-in animations

### 7. Experience Timeline
**File**: `src/components/sections/ExperienceSection.tsx`

- Vertical timeline with cards for each role:
  - Meta internship
  - Convo AI (founder)
  - Previous positions
- Tech stack badges for each role
- Scroll-triggered slide-in animations (alternating left/right)
- Hover effects on cards

### 8. Projects Showcase
**File**: `src/components/sections/ProjectsSection.tsx`

- Grid of project cards:
  - Convo AI (with screenshots/demo link)
  - WhatsApp Bot
  - AR Filters showcase
  - Other notable projects
- Each card: image, title, description, tech stack, links (GitHub/demo)
- Filter by technology (optional)
- Hover zoom effect

### 9. Skills Section
**File**: `src/components/sections/SkillsSection.tsx`

- Categorized skill groups:
  - Languages
  - Frontend
  - Backend
  - Tools & Platforms
- Visual representation (badges, progress bars, or skill cloud)
- Scroll-triggered animations (stagger effect)

### 10. Contact Section
**File**: `src/components/sections/ContactSection.tsx`

- Contact form with validation:
  - Name (required)
  - Email (required, valid format)
  - Message (required, min length)
- Social links (LinkedIn, GitHub, Email)
- Form submission handling (can use Formspree or EmailJS for backend)
- Success/error states with animations

### 11. Navigation & UX
**File**: `src/components/ui/Navbar.tsx`

- Fixed top navigation bar
- Section links with smooth scroll
- Active section indicator (highlights current section)
- Mobile hamburger menu
- Glass morphism effect (subtle backdrop blur)

**File**: `src/components/ui/FaceTrackToggle.tsx`

- Toggle button for camera permission
- Clear icons (camera on/off)
- Privacy tooltip ("Your camera data stays local")
- Smooth state transitions

**File**: `src/hooks/useScrollAnimation.ts`

- Intersection Observer for scroll-triggered animations
- Threshold and rootMargin configuration
- Returns `ref` and `isVisible` for components

### 12. Responsive Design
- Desktop (>1024px): Side-by-side layouts, full 3D features
- Tablet (768-1024px): Stacked layouts, 3D avatar smaller
- Mobile (<768px): Single column, simplified 3D scene (performance)
- Face tracking optional on mobile (battery consideration)

### 13. Performance Optimizations
- Lazy load sections below fold
- Code splitting by route/section
- Optimize GLB model if >10MB (use glTF-Transform)
- Throttle face tracking updates to 30 FPS
- Use `useMemo` for heavy calculations
- Preload critical assets
- Implement loading screen with progress

### 14. Accessibility & Privacy
- Keyboard navigation support
- ARIA labels for interactive elements
- Camera permission clearly explained
- Face tracking data never leaves browser
- Alt text for all images
- Color contrast meets WCAG AA standards
- Reduced motion respect (`prefers-reduced-motion`)

## Critical Files to Create

1. **Core 3D**: `Avatar3D.tsx`, `Scene.tsx`, `FaceTracker.tsx`
2. **Face Tracking**: `useFaceTracking.ts`, `faceToRotation.ts`
3. **Sections**: All 6 section components in `sections/`
4. **Data**: `portfolioData.ts` with resume content
5. **Config**: `tailwind.config.js` with light theme tokens
6. **Entry**: `App.tsx` with scroll orchestration

## Verification Steps

### Development Testing
1. **Start dev server**: `npm run dev`
2. **Test face tracking**:
   - Open browser DevTools → Console (check for MediaPipe logs)
   - Grant camera permission
   - Move head left/right, up/down → avatar head should follow smoothly
   - Toggle off → avatar should return to idle animation
3. **Test scroll animations**:
   - Scroll through all sections
   - Verify each section animates on entry
   - Check navbar highlights correct section
4. **Test responsive**:
   - Resize window to mobile/tablet/desktop
   - Verify 3D scene scales appropriately
   - Check all sections are readable
5. **Test forms**:
   - Submit contact form with invalid data → see validation errors
   - Submit with valid data → see success message

### Performance Checks
- **Lighthouse score**: Aim for >85 Performance, >95 Accessibility
- **FPS counter**: Should maintain 60fps during face tracking
- **Network tab**: GLB model should load progressively
- **Mobile device testing**: Test on actual phone if available

### Browser Compatibility
- Test in Chrome, Firefox, Safari (latest versions)
- MediaPipe works best in Chrome/Edge (WebGPU support)

## Deployment Considerations
- Build: `npm run build`
- Preview: `npm run preview`
- Deploy to Vercel/Netlify (automatic HTTPS)
- Ensure GLB model is in build output
- Set proper caching headers for model file

## Future Enhancements (Post-MVP)
- Add blog section with MDX support
- Implement dark/light theme toggle
- Add more complex 3D interactions (e.g., hand gestures)
- Integrate analytics (Vercel Analytics, Plausible)
- Add testimonials/recommendations section
- Create OG images for social sharing
- Add Easter eggs (Konami code, hidden interactions)
