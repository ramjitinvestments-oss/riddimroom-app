# Riddim Room EventCam Operations Guide

Welcome to the **Riddim Room EventCam** operational manual. This document serves as the absolute guide for event staff, administrators, and setup engineers to master the private secure capture system.

---

## 1. System Overview & Entry Gateways
Riddim Room EventCam delivers secure, private, and high-performance branding overlay and background removal photography directly inside live event venues. To prevent unauthorized guest access or media leaks, all operators undergo a strict, two-stage gate check sequence.

### A. Staff Account Sign-Up
- **Secure Authentication Options:** Operators can sign up using high-security **Google Sign-In** or standard email credentials (requires a secure password of at least 6 characters).
- **Initial "Pending" Protection:** By default, newly registered accounts are written to Cloud Firestore under a restricted **PENDING** status state. Pending accounts see an administrative hold screen indicating "Awaiting Approval" and are locked from accessing the camera feed.

### B. Administrative Approvals
- **Administrative Hub:** High-level admin personnel can sign in with the pre-authorized master administrative email address:
  - `RamjitInvestments@gmail.com`
- **Instant Verified Overrides:** This specific account is immediately recognized by the system and achieves permanent administrative controls.
- **Reviewing & Authorizing Staff:**
  1. Login with the authorized admin credential.
  2. Click the **System Admin** icon in the header menu tray.
  3. Locate the list under the **Pending Verification** section.
  4. Click **APPROVE** next to the operator's email address.
  5. The Firestore security state updates instantly to **APPROVED**, allowing the target staff device to unlock capture features.

---

## 2. Using the Brand Design Studio & Camera Feed
Once approved, staff devices gain full access to the live venue capture dashboards.

### A. Watermark & Logo Alignment
- **Custom Branded Logos:** Drag and drop PNG logos or choose from the built-in slots (including the standard Riddim Room SVG layout).
- **Control Dimensions:**
  - **Scale Slider:** Resize custom brand logos dynamically to match frame density.
  - **Transparency Slider:** Fine-tune the alpha-channel to create clean, unobtrusive transparent badges.
- **Persistent States:** Branding settings are automatically synchronized with localized persistence buffers, keeping configurations safe through page refreshes.

### B. Capture Modes & Advanced Processing
- **Responsive Aspect Ratios:** Toggle between landscape (16:9), cinematic square (1:1), or high-impact vertical (9:16) boundaries instantly.
- **Photo Snapshots:** Click the main yellow shutter button to capture immediate, high-definition captures.
- **WASM Neural Background Removal:** Toggle background subtraction to run neural processing nodes offline directly inside the device browser. This avoids sending raw files across cellular networks.
- **Video Snaps:** Long-press the shutter button to capture short mp4 loops.

---

## 3. Administrative Supervision & Safety Guardrails
Admins maintain continuous control over the shared guest galleries and kiosk hardware deployments.

### A. Kiosk Mode (`?mode=camera`)
- **Config Locks:** Append `?mode=camera` to the URL query parameters on dedicated tablet mounts to lock editing toolbars, scale inputs, and navigation buttons. This ensures guests only interact with the camera trigger.

### B. Global Access Switch
- **Emergency Restraints:** Administrators can globally toggle the **Global Access Switch** directly on active dashboards. Flipping this switch immediately invalidates guest review paths, restricting unauthorized links on outside networks.

### C. Live Performance Monitors
- **Real-Time Latency Gauges:** Click the diagnostics panel to monitor security authorization scopes, database pings, camera device states, and active local storage limits.

---

## 4. Setup & Installation Guide (For ZIP Exports)
If you have downloaded the source code as a ZIP archive and wish to run a standalone instance inside your own developer node, follow these exact terminal steps:

### A. Install Node Dependencies
Unzip the file and run npm clean installation in your workspace directory:
```bash
npm install
```

### B. Launch Local Developer Server
Start the development Express server configuration on the standard port:
```bash
npm run dev
```
The application will bundle scripts with Vite and run at:
`http://localhost:3000`

### C. Connecting a Custom Firebase Database
To link the application to your own Firebase project:
1. Open your **Firebase Console**.
2. Register a new **Web App** client.
3. Copy the configuration JSON file structure.
4. Replace the parameters in the `/firebase-applet-config.json` folder.
5. Restart the server.

---
*Riddim Room EventCam Secure Production Software Guidelines. 2026. All Rights Reserved.*
