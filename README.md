# 🎵 Nextify

Nextify is a full-stack music streaming application inspired by Spotify.
Users can upload and manage their own tracks, explore songs shared by the community,
build a personal library, and enjoy a seamless music playback experience.

## 📸 Preview

![App Preview](https://raw.githubusercontent.com/mutateddev/nextify/refs/heads/main/public/images/preview.png)

![App Preview](https://raw.githubusercontent.com/mutateddev/nextify/refs/heads/main/public/images/light-mode.png)

![App Preview](https://raw.githubusercontent.com/mutateddev/nextify/refs/heads/main/public/images/preview-form.png)

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
- Different States of data handling

## 🚀 Getting Started

```bash
git clone https://github.com/mutateddev/nextify.git

cd nextify

npm install

npm run dev
```

Open your browser and navigate to: [localhost](http://localhost:3000)
