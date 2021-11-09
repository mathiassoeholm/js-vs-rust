import init, {
  md5_benchmark,
} from "./node_modules/js-vs-rust/pkg/js_vs_rust.js";
init().then(() => {
  md5_benchmark(postMessage);
});
