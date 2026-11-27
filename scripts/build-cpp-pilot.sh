#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/.."
wasm_linker=$(command -v "${WASM_LD:-wasm-ld}")
"${CXX:-clang++}" --target=wasm32 -std=c++20 -O0 -g -nostdlib -fno-exceptions \
  -fdebug-prefix-map="$(pwd)=." \
  -fuse-ld="$wasm_linker" -Wl,--no-entry,--export=run,--export-memory \
  src/lab/cpp/find_if.cpp -o src/lab/cpp/find_if.wasm
chmod 644 src/lab/cpp/find_if.wasm
