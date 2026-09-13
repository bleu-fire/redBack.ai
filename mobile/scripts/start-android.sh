#!/usr/bin/env bash
set -euo pipefail

SDK_ROOT="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}}"
ADB="$SDK_ROOT/platform-tools/adb"
EMULATOR="$SDK_ROOT/emulator/emulator"
AVD_NAME="${ANDROID_AVD_NAME:-Pixel_8}"

if [[ ! -x "$ADB" || ! -x "$EMULATOR" ]]; then
  echo "Android SDK tools were not found at: $SDK_ROOT"
  echo "Set ANDROID_HOME to your Android SDK directory and try again."
  exit 1
fi

export PATH="$SDK_ROOT/platform-tools:$SDK_ROOT/emulator:$PATH"

"$ADB" start-server >/dev/null

if ! "$ADB" devices | awk 'NR > 1 && $2 == "device" { found=1 } END { exit found ? 0 : 1 }'; then
  echo "Starting $AVD_NAME in stable software-rendered mode..."
  nohup "$EMULATOR" "@$AVD_NAME" \
    -no-snapshot-load \
    -no-snapshot-save \
    -no-boot-anim \
    -accel off \
    -gpu swiftshader_indirect \
    >/tmp/redback-android-emulator.log 2>&1 &
fi

echo "Waiting for Android emulator..."
"$ADB" wait-for-device
until [[ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" == "1" ]]; do
  sleep 2
done

echo "Android emulator is ready. Starting Expo..."
exec npx expo start --android
