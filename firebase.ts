import { FirebaseOptions, getApps, initializeApp } from "firebase/app"
import { Analytics, getAnalytics } from "firebase/analytics"
import { RemoteConfig, fetchAndActivate, getRemoteConfig } from "firebase/remote-config"

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

let analytics: Analytics
let remoteConfig: RemoteConfig

if (firebaseApp.name && typeof window !== "undefined") {
  analytics = getAnalytics(firebaseApp)

  // Get the Remote Config service for the default app
  remoteConfig = getRemoteConfig(firebaseApp)
  const remoteConfigDefaults = require("./remote_config_defaults.json")
  remoteConfig.defaultConfig = remoteConfigDefaults
  fetchAndActivate(remoteConfig)
}

export { analytics, remoteConfig }
