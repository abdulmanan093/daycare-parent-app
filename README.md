# How to Run Daycare Parent App

This guide explains how to set up and run the Daycare Parent Application.

## Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (Install via `npm install -g expo-cli`)

## Installation

1. Open a terminal in this directory.
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

- **Start Metro Bundler:**
  ```bash
  npx expo start --clear
  ```
  This will start the Expo development server. You can then:
  - Press `a` to run on Android Emulator.
  - Press `i` to run on iOS Simulator (macOS only).
  - Scan the QR code with the Expo Go app on your physical device.

- **Run directly on platforms:**
  ```bash
  npm run android
  npm run ios
  npm run web
  ```

## Troubleshooting

- If you encounter dependencies issues, try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
- Ensure your Android Emulator or iOS Simulator is running before pressing `a` or `i`.
