#!/bin/bash
echo "�� Building Debug APK..."
cd android
./gradlew assembleDebug
echo "✅ APK generated at: android/app/build/outputs/apk/debug/app-debug.apk"
cd ..
