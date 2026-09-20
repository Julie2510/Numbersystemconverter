BASE CONVERTER APP
Project Documentation
Project Title: Base Converter App (Number System Converter)
Developer: CT00/G/26137/25
                        Kevin Onunga
Kirinyaga University
Date:21st September 2026
Course: BSc. Information Technology
Live Links:
Web Version (Netlify): https://capable-manatee-c98b49.netlify.app
Mobile Build (Expo): https://expo.dev/accounts/traviskev/projects/base-converter-app/builds/5fdc894f-926f-4206-b7e6-5712a352cf7a
Build ID: 5fdc894f-926f-4206-b7e6-5712a352cf7a
Local Project Path: C:\Users\HomePC\Projects\NumberSystemConverter

INTRODUCTION
The Base Converter App is a simple tool I built to help convert numbers from one number system to another. In Information Technology we use different number systems like Binary (base 2), Octal (base 8), Decimal (base 10) and Hexadecimal (base 16). Doing these conversions manually takes time and one can easily make mistakes.
I first built the web version and hosted it on Netlify. You can access it at capable-manatee-c98b49.netlify.app. It works on any browser. Later I decided to make it a mobile app as well so it can work offline on Android phones. For the mobile version I used React Native with Expo, and I built an APK using EAS Build. 
 PROBLEM STATEMENT
Many students struggle with number system conversions, especially when learning binary and hexadecimal. Calculators that do base conversion are not always available offline, and most online tools require internet. I wanted to create a tool that is simple, fast, offline-capable and works on both iOS and mobile operating systems.
OBJECTIVES
Main objective: To develop a cross-platform base converter that converts between Decimal, Binary, Octal and Hexadecimal.
Specific objectives:
a)	To ensure the conversion is instant and accurate
b)	To make the app work offline on mobile
c)	To provide a clean and easy way to understand user interface

SYSTEM REQUIREMENTS
For Mobile Version the following was required :
- Node.js v24.21.0 (I upgraded from v18.16.1)
- npm v11.6.0
- Expo SDK 54
- Expo Go app on Android phone
- EAS CLI for building APK
- Laptop: Windows 10/11
TECHNOLOGY 

I used the same core logic for the platforms.
Web Stack:
- Frontend: React.js
- Language: JavaScript
- Hosting: Netlify
- Build Tool: Vite / Create React App
Mobile Stack:
- Framework: React Native
- Platform: Expo SDK 54
- Language: JavaScript (ES6)
- State Management: React use State hook
- Build Service: Expo Application Services (EAS)
- Testing: Expo Go
HOW THE SYSTEM WORKS??
The logic is very straightforward.
When a user types a number in Decimal, the app does:
const convert = (decimalValue) => {
  if (!decimalValue) return { binary: "", octal: "", hex: "" };
  
  const num = parseInt(decimalValue, 10);
  if (isNaN(num)) return { binary: "Invalid", octal: "Invalid", hex: "Invalid" };

  return {
    binary: num.toString(2),
    octal: num.toString(8),
    hex: num.toString(16).toUpperCase()
  };
};
Example:
If user enters 10
- parseInt("10",10) gives 10
- (10).toString(2) gives "1010" (Binary)
- (10).toString(8) gives "12" (Octal)
- (10).toString(16) gives "a" -> "A" (Hex)

The app uses React useState to store the input and instantly re-renders the converted values. No backend or database is needed. Everything happens on the device.

System Flow:
User Input -> onChangeText / onChange Event -> Validation (check if number) -> Conversion using toString(base) -> Update State -> Display Results

PROJECT STRUCTURE

For Mobile (NumberSystemConverter):
NumberSystemConverter/
App.js - Main file with all conversion logic
 package.json - Lists dependencies (expo, react, react-native)
 app.json - Expo config (app name, icon, package name)
 eas.json - EAS build config for Android
 assets/ - App icon and splash screen
 node_modules/ - Installed libraries
 README.md - Project instructions
CHALLENGES FACED AND HOW I SOLVED THEM
This is the most important part of my documentation because I learned a lot here.
Challenge 1: Expo Router Error
Error message: "Unable to resolve module ./node_modules/expo-router/entry.js"
What happened: When I ran npx expo start, it failed to bundle. It showed Android Bundling failed 34902ms with error about expo-router.
Root cause: I realized I had a nested folder. My path was C:\Users\HomePC\Projects\NumberSystemConverter\NumberSystemConverter. So I had two package.json files and the Expo router from the Tabs template was confusing Metro bundler. Also my Node.js was version 18.16.1 which is too old for Expo SDK 54. SDK 54 needs Node 22 or 24.
Solution :
1. I deleted the nested folder using PowerShell: Remove-Item -Recurse -Force .\NumberSystemConverter\NumberSystemConverter
2. I upgraded Node.js from 18.16.1 to 24.21.0 LTS (current latest)
3. I upgraded npm to 11.6.0
4. I cleared Expo cache: npx expo start -c
5. After that, it bundled successfully with 1773 modules and showed "Welcome to Expo" on my phone via Expo Go.
Challenge 2: Linking Web and Mobile
I had to make sure the same conversion logic works on both React (web) and React Native (mobile). I solved it by keeping the core functions pure JavaScript.
 HOW TO RUN THE PROJECT
To run Mobile Version (Development):
1. Open VS Code
2. Open folder: C:\Users\HomePC\Projects\NumberSystemConverter
3. Run npm install
4. Run npx expo start -c
5. Install Expo Go on your Android phone
6. Scan the QR code
To Build APK (Like my Expo link):
1. Install EAS CLI: npm install -g eas-cli
2. Login: eas login (username: traviskev)
3. Build: eas build --platform android
4. Wait for build to finish, you will get a link like mine: expo.dev/accounts/traviskev/projects/base-converter-app/builds/...
To run Web Version:
1. Just open https://capable-manatee-c98b49.netlify.app in your browser
TESTING
I tested with different values:
Test 1: Input 10
Output: Binary 1010, Octal 12, Hex A - PASS
Test 2: Input 255 (maximum for 8-bit)
Output: Binary 11111111, Octal 377, Hex FF - PASS
Test 3: Input 50
Output: Binary 110010, Octal 62, Hex 32 - PASS
Test 4: Empty input
Output: All fields clear - PASS
Test 5: Invalid characters
Output: Handled, shows empty - PASS
All tests were done on both Netlify web version and Expo Go mobile version.
DEPLOYMENT
Mobile Deployment (Expo EAS):
I used EAS Build service. The build ID is 5fdc894f-926f-4206-b7e6-5712a352cf7a. The artifact is an APK file that can be installed directly on Android. The link expires after 30 days but can be rebuilt anytime. This is the link I submitted: https://expo.dev/accounts/traviskev/projects/base-converter-app/builds/5fdc894f-926f-4206-b7e6-5712a352cf7a
Web Deployment (Netlify):
I built the React app and deployed to Netlify. Netlify gave me the URL capable-manatee-c98b49.netlify.app. It is public and anyone can access it without login.

CONCLUSION
The project achieved its objectives. I successfully deployed the base converter on both web (Netlify) and mobile (Expo). I also learned how to debug real-world React Native errors like the expo-router/entry issue and how to upgrade Node.js to match SDK requirements.

The app is simple but very useful for students learning number systems. In future, I plan to add support for base 2 to 36, fractional numbers, conversion history, and publish it to Google Play Store.
Date: 21/09/2026
