import init, { md5_benchmark } from "js-vs-rust/pkg";
init().then(() => {
  md5_benchmark(postMessage);
});
