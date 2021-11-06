import init, { md5_benchmark } from "./pkg/js_vs_rust.js";
init().then(() => {
  md5_benchmark(postMessage);
});
