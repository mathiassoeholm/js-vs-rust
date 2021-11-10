import init, { md5_benchmark } from "js-vs-rust";
init().then(() => {
  md5_benchmark(postMessage);
});
