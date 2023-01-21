import { FirebaseApp, getApps, initializeApp } from "firebase/app"
import { Analytics, getAnalytics } from "firebase/analytics"
import { type } from "os"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
let app: FirebaseApp
let appArray = getApps()
if (!appArray.length) {
    app = initializeApp(firebaseConfig)
} else {
    app = appArray[0]
}

let analytics: Analytics

if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

export { analytics }
