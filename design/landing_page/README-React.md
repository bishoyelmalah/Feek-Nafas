# Landing Page - React Conversion

This folder contains the converted React version of the Tailwind HTML landing page.

## Files Created

- **LandingPage.tsx** - Main React component with all the landing page structure
- **LandingPage.css** - Complete CSS stylesheet (converted from Tailwind utilities to standard CSS)
- **index-react.html** - Sample HTML file showing how to integrate the component

## Integration into Existing Project

Since your project already has a React structure (`src/pages/LandingPage/`), you can integrate these files as follows:

### Option 1: Replace Existing Landing Page

1. **Copy the CSS file:**
   ```bash
   cp design/landing_page/LandingPage.css src/pages/LandingPage/LandingPage.module.css
   ```

2. **Copy the component:**
   ```bash
   cp design/landing_page/LandingPage.tsx src/pages/LandingPage/LandingPage.tsx
   ```

3. **Update imports in LandingPage.tsx:**
   ```typescript
   import './LandingPage.module.css';
   ```

### Option 2: Add as New Component

1. Create a new folder: `src/pages/LandingPageNew/`
2. Copy both files to that folder
3. Update your routing to use the new component

## Required Dependencies

This component uses:
- **React** (already in your project)
- **Google Fonts - Public Sans** (add to `index.html`)
- **Material Symbols** (add to `index.html`)

### Add to your `index.html` in the `<head>` section:

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

## Design System

The CSS uses CSS variables for the design system:

```css
--primary: #ec5b13
--background-light: #f8f6f6
--background-dark: #1a0f0a
--accent-blue: #00f2ff
```

## Key Features Converted

✅ Sticky navigation header  
✅ Hero section with animated background  
✅ AI Instructor cards with hover effects  
✅ Arena mode cards  
✅ Contributors section (footer)  
✅ Responsive design (mobile, tablet, desktop)  
✅ Neon effects and cyberpunk theme  
✅ All animations and transitions  

## Notes

- All Tailwind utility classes have been converted to standard CSS
- The component is fully functional and responsive
- No Tailwind CDN dependency required
- All styles are in the CSS file for easy customization
- Material Icons are used for all icons (same as original)

## Usage in App

```typescript
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return <LandingPage />;
}
```

## Customization

To customize colors, fonts, or spacing:
1. Edit the CSS variables in `:root` at the top of `LandingPage.css`
2. Modify specific component styles in their respective CSS sections
3. All styles are organized by component for easy navigation
