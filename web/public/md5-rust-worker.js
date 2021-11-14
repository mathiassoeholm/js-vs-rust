import init, { md5_benchmark } from "./rust/js_vs_rust.js";
init().then(() => {
  const timeStart = Date.now();
  md5_benchmark(postMessage);
  const duration = Date.now() - timeStart;
  postMessage(duration);
});
