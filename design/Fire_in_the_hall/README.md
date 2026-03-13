# Fire in the Hall - Cinematic Intro Sequence

A dramatic, cyberpunk-themed intro animation for Feek Nafas featuring a gravity-based projectile drop, explosion blast, and neon branding reveal.

## 🎬 Features

- **Phase 1: The Drop** - Animated projectile falls from above with trailing fire effect
- **Phase 2: The Blast** - Impact explosion with screen shake effect
- **Phase 3: The Reveal** - Neon branding reveal with terminal logo
- Cyberpunk grid background
- Scanline overlay effects
- Framer Motion animations
- Fully responsive design

## 📁 Files

- **IntroSequence.tsx** - React TypeScript component
- **IntroSequence.css** - Component styles
- **index.html** - Standalone HTML page (works without build tools)
- **README.md** - This file

## 🚀 Usage

### Option 1: Standalone Page (No Build Required)

Simply open `index.html` in a web browser. The page uses CDN links for React and Framer Motion.

```bash
# From the Fire_in_the_hall directory
open index.html
# or
start index.html
```

### Option 2: Integrate into React Project

1. **Install Framer Motion** (if not already installed):
   ```bash
   npm install framer-motion
   ```

2. **Copy files to your project:**
   ```bash
   cp IntroSequence.tsx src/pages/IntroPage/
   cp IntroSequence.css src/pages/IntroPage/
   ```

3. **Import and use:**
   ```tsx
   import IntroSequence from './pages/IntroPage/IntroSequence';
   
   function App() {
     return <IntroSequence />;
   }
   ```

### Option 3: Add to Existing Feek Nafas Project

Add to your router:

```tsx
import IntroSequence from '../design/Fire_in_the_hall/IntroSequence';

<Route path="/intro" element={<IntroSequence />} />
```

## 🎨 Customization

### Timing

Adjust phase transitions in `IntroSequence.tsx`:

```tsx
const blastTimer = setTimeout(() => {
  setPhase('blast');
}, 1200); // Change timing here

const revealTimer = setTimeout(() => {
  setPhase('reveal');
}, 1700); // Change timing here
```

### Colors

Edit colors in `IntroSequence.css`:

```css
/* Primary color */
background-color: #ec5b13; /* Change to your brand color */

/* Grid overlay */
background-image: linear-gradient(#ec5b13 1px, transparent 1px);
```

### Animation Speed

Modify motion properties:

```tsx
<motion.div
  transition={{ duration: 0.8 }} // Adjust duration
>
```

## 📦 Dependencies

- **React** 18+
- **Framer Motion** 10+
- **Google Fonts** - Public Sans
- **Material Symbols** - For icons

## 🎯 Animation Sequence

1. **0.0s - 1.2s**: Projectile drops with gravity effect
2. **1.2s - 1.7s**: Explosion blast with screen shake
3. **1.7s+**: Branding reveal with fade-in
4. **2.2s+**: Call-to-action button appears

## 💡 Tips

- The intro plays once on component mount
- To replay, refresh the page or remount the component
- The "INITIALIZE SYSTEM" button links to `/arena` (update as needed)
- Works best in fullscreen or as a splash screen

## 🔧 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (with webkit prefixes)
- Mobile browsers: ✅ Responsive design included

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (full size icons and text)

## 🎭 Performance Notes

- Uses GPU-accelerated CSS transforms
- Framer Motion optimized for 60fps
- Minimal reflows during animation
- Automatic cleanup of timers on unmount

---

**Created for Feek Nafas** - The ultimate cyberpunk competitive programming platform
