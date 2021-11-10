import init, { md5_benchmark } from "./rust/js_vs_rust.js";
init().then(() => {
  md5_benchmark(postMessage);
});
