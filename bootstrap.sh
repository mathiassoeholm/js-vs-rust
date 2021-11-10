#!/bin/bash
cd rust
wasm-pack build --target web --release
cd ../web
yarn
cd ..

# Move Rust files to the public folder
rm -rf web/public/rust
mkdir web/public/rust
cp rust/pkg/*.js web/public/rust/
cp rust/pkg/*.wasm web/public/rust/