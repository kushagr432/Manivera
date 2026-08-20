/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Firebase (publishable client identifiers)
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string

  // Cloudinary (unsigned browser uploads)
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
  readonly VITE_CLOUDINARY_UPLOAD_FOLDER?: string

  // Site and admin routing
  readonly VITE_SITE_URL?: string
  readonly VITE_ADMIN_BASE_PATH?: string
  readonly VITE_SHOW_ADMIN_LINK?: string
  readonly VITE_DEV_ALLOWED_HOSTS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
