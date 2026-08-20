/**
 * Central runtime configuration.
 *
 * Every credential and environment-specific URL is read from an environment
 * variable so the same source tree can target local, staging and production
 * without code changes. See .env.example for the full list.
 *
 * IMPORTANT: Vite inlines every VITE_-prefixed variable into the client bundle
 * at build time, so anything here is readable by anyone who loads the site.
 * Only publishable identifiers belong in this file. Private secrets go in .env
 * *without* the VITE_ prefix, which keeps them out of the bundle entirely.
 */

const env = import.meta.env as unknown as Record<string, string | undefined>

const required = (name: string): string => {
  const value = env[name]
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. ` +
        'Copy .env.example to .env and fill in the values.'
    )
  }
  return value
}

const optional = (name: string, fallback = ''): string => env[name] || fallback

// --- Firebase -------------------------------------------------------------
// These are publishable client identifiers, not secrets. Access is controlled
// by Firebase Auth and your Firestore/Storage security rules.
export const firebaseConfig = {
  apiKey: required('VITE_FIREBASE_API_KEY'),
  authDomain: required('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: required('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: required('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: required('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: required('VITE_FIREBASE_APP_ID'),
  measurementId: optional('VITE_FIREBASE_MEASUREMENT_ID')
}

// --- Cloudinary -----------------------------------------------------------
// Only the values an unsigned browser upload needs. The API key and secret are
// server-side credentials and are deliberately absent from the client bundle.
export const cloudinaryConfig = {
  cloudName: required('VITE_CLOUDINARY_CLOUD_NAME'),
  uploadPreset: required('VITE_CLOUDINARY_UPLOAD_PRESET'),
  uploadFolder: optional('VITE_CLOUDINARY_UPLOAD_FOLDER', 'jewelry-products')
}

// --- Site ----------------------------------------------------------------
/** Public origin of the deployed site, e.g. https://manivrajewels.com */
export const siteUrl = optional('VITE_SITE_URL', window.location.origin).replace(/\/+$/, '')

/** Build an absolute URL against the configured site origin. */
export const absoluteUrl = (path = '/'): string =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

// --- Admin routing -------------------------------------------------------
const normalizeBasePath = (raw: string): string => {
  const trimmed = raw.trim().replace(/\/+$/, '')
  if (!trimmed || trimmed === '/') return '/admin'
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

/** Mount point for the admin panel, e.g. "/admin" or "/manage". */
export const ADMIN_BASE_PATH = normalizeBasePath(optional('VITE_ADMIN_BASE_PATH', '/admin'))

/** Build an admin route: adminPath('products') -> "/admin/products". */
export const adminPath = (subPath = ''): string => {
  const clean = subPath.replace(/^\/+/, '').replace(/\/+$/, '')
  return clean ? `${ADMIN_BASE_PATH}/${clean}` : ADMIN_BASE_PATH
}

/** Whether the public site header should advertise the admin panel. */
export const showAdminLinkInHeader = optional('VITE_SHOW_ADMIN_LINK', 'true') !== 'false'
