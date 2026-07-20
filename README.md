# 🎵 Nextify

A modern music streaming application built with Next.js 16, React 19, Supabase, TanStack Query, and Tailwind CSS v4.

Users can upload their own songs, browse music uploaded by everyone, create a personal library, and enjoy a clean Spotify-inspired music player.

## 📸 Preview

![App Preview](https://raw.githubusercontent.com/mutateddev/nextify/refs/heads/main/public/images/preview.png)
![App Preview](https://raw.githubusercontent.com/mutateddev/nextify/refs/heads/main/public/images/light-mode.png)
![App Preview](https://raw.githubusercontent.com/mutateddev/nextify/refs/heads/main/public/images/upload-form.png)

## 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

### Backend

- Supabase
  - Authentication
  - Database
  - Storage

### Data Fetching

- TanStack Query

### UI

- Lucide React Icons

## ✨ Features

### Authentication

- User sign up and login with Supabase Authentication
- Protected routes using Next.js Middleware
- Authenticated users are redirected away from login/signup pages

### Music Library

- Upload songs with cover images
- Upload audio files to Supabase Storage
- Store song metadata inside Supabase Database
- View all uploaded songs
- Personal library showing only songs uploaded by the current user
- Delete uploaded songs

### UI / UX

- Responsive layout
- Modern dark theme
- Skeleton loading states
- Empty states
- Error states
- Smooth hover animations
- Optimized image loading with Next.js Image

## 🚀 Getting Started

```bash
git clone https://github.com/mutateddev/nextify.git

cd nextify

npm install

npm run dev
```

Open your browser and navigate to: [localhost](http://localhost:3000)
