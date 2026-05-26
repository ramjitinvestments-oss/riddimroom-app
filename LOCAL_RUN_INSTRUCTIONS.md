# Riddim Room EventCam - Local Setup & Firebase Integration Guide

This guide provides clear, step-by-step instructions to run your **RiddimRoomEventCam** application locally on your computer and safely link it to your own **Riddim Room EventCam** (`riddimroomeventcam`) Firebase project instead of the temporary development project (`centering-dynamics-plsxp`).

---

## Step 1: Export & Download the Fresh ZIP Folder
To make sure you don't have any corrupted or malformed files (such as formatting syntax errors in `firebase-applet-config.json` that prevent building):
1. In the top-right of your AI Studio environment, click on the **Settings** or **Export** option.
2. Select **Export to ZIP**.
3. Extract the downloaded ZIP file to your preferred folder on your desktop (e.g., `C:\Users\Rabindra\Desktop\RiddimRoomEventCam`).

---

## Step 2: Update Your Firebase Config Locally
When you export from the sandbox, the `firebase-applet-config.json` file points to the temporary sandbox database. For your live users to access **your** database, you need to paste your own Firebase Web Config.

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your **riddimroomeventcam** project.
3. Click on the gear icon (Project Settings) next to Project Overview in the left sidebar.
4. Scroll down to the **Your apps** section.
5. Under the Web app (create one if you haven't yet), look for the `firebaseConfig` block. It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "riddimroomeventcam.firebaseapp.com",
     projectId: "riddimroomeventcam",
     storageBucket: "riddimroomeventcam.firebasestorage.app",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```
6. Open your local file `firebase-applet-config.json` in a text editor (like Notepad, VS Code, or Notepad++).
7. Replace the sandbox keys with your real keys from the Firebase Console. Make sure it format matches exactly to avoid JSON syntax errors:
   ```json
   {
     "projectId": "riddimroomeventcam",
     "appId": "YOUR_APP_ID",
     "apiKey": "YOUR_API_KEY",
     "authDomain": "riddimroomeventcam.firebaseapp.com",
     "firestoreDatabaseId": "(default)",
     "storageBucket": "riddimroomeventcam.firebasestorage.app",
     "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
     "measurementId": "YOUR_MEASUREMENT_ID"
   }
   ```
   *Note: Ensure `firestoreDatabaseId` is set to `"(default)"` if you are using the default Firestore database in your custom project.*

---

## Step 3: Fix "Unauthorized Domain" for Google Logins
If your users are seeing an error saying `"riddimroomeventcam.web.app is not authorized..."`, this is handled entirely inside the Firebase Console (the local server doesn't need to be restarted).

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Under the **Build** section in the left sidebar, click **Authentication**.
3. Click on the **Settings** tab at the top.
4. Click on **Authorized domains** in the secondary submenu.
5. Click **Add domain**.
6. Type:
   - `riddimroomeventcam.web.app` (add this and click Add)
   - `riddimroomeventcam.firebaseapp.com` (if not already there)
   - `localhost` (so you can sign in when running the app on `http://localhost:3000` or `http://localhost:5173`)
7. Click Save. The changes are applied instantly by Google; no local terminal commands are required!

---

## Step 4: Configure Google Sign-In Provider Secrets
If Google Login still asks for safelisting or throws client errors:
1. In Firebase Console > Authentication > **Sign-in method**, click on the **Google** provider to edit it.
2. Ensure you have configured the **Web SDK configuration** section.
3. Use the **Web client ID** and **Web client secret** generated in your [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials) for your project ID.

---

## Step 5: Android Apps & SHA-1 Release Fingerprint (If Wrap into APK)
If you are compiling your web application into a native Android wrapper app (like Capacitor, Cordova, or standard WebView in Android Studio):
1. Google Sign-In **requires** the SHA-1 fingerprint of the signing certificate because request signatures are validated by Google Play.
2. **Where to Find SHA-1:**
   - In Android Studio, open the Gradle menu on the right.
   - Navigate to `YourApp > Tasks > android > signingReport` and double click it.
   - Alternatively, open a terminal in your Android project folder and run:
     ```bash
     ./gradlew signingReport
     ```
     *(If using Windows PowerShell or Command Prompt, make sure you are in the Android project root directory where the `gradlew` script exists before executing).*
   - Look for the line: `SHA1: XX:XX:XX:XX...` under the release variant.
3. **Where to Add SHA-1:**
   - Go to Firebase Console > Project Settings.
   - Scroll down to **Your apps**, select your Android app, and click **Add fingerprint**.
   - Paste the SHA-1 value and save.

---

## Step 6: Install & Build Fresh Locally
Now, run the setup commands in your terminal:
1. Open your terminal (Cmd/PowerShell on Windows, Terminal on macOS).
2. Use `cd` to navigate to your clean extracted folder:
   ```cmd
   cd C:\Users\Rabindra\Desktop\RiddimRoomEventCam
   ```
3. Run NPM install to download all packages:
   ```bash
   npm install
   ```
4. Build the application:
   ```bash
   npm run build
   ```
5. Start your dev server:
   ```bash
   npm run dev
   ```

You are all set! Your local app is now beautifully running with pristine files, connected securely to your custom **RiddimRoomEventCam** production Firebase project. All Google Sign-In calls will sync perfectly!
