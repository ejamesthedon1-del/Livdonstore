# Livdon Online Store

A modern, responsive online store landing page built with React and Tailwind CSS.

## Features

- 🍔 Hamburger menu with logo on the left
- 🖼️ Hero image section with overlay text
- 🎠 Image slider/carousel with auto-play functionality
- 📱 Fully responsive design
- ⚡ Built with Vite for fast development

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   ├── LandingPage.jsx    # Main landing page component
  │   ├── HeroSection.jsx    # Hero image section
  │   └── ImageSlider.jsx    # Image slider/carousel component
  ├── App.jsx                # Root component
  ├── main.jsx               # Entry point
  └── index.css              # Global styles
```

## Customization

- Replace hero image URL in `HeroSection.jsx`
- Update slider images in `ImageSlider.jsx` slides array
- Modify logo text in `LandingPage.jsx`
- Customize colors and styling in Tailwind classes
