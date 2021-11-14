import { writable } from "svelte/store";

interface Benchmark {
  title: string;
  jsWorkerPath: string;
  rustWorkerPath: string;
}

interface BenchmarkInfo {
  status: "pending" | "running" | "done";
  jsTime?: number;
  rustTime?: number;
}

const benchmarks: Benchmark[] = [
  {
    title: "Hash XXXXX string with MD5",
    jsWorkerPath: "md5-js-worker.js",
    rustWorkerPath: "md5-rust-worker.js",
  },
];

const benchmarkInfo = writable<{ [index: number]: BenchmarkInfo }>(
  benchmarks.reduce(
    (obj, benchmark, index) => ({ ...obj, [index]: { status: "pending" } }),
    {}
  )
);

const updateBenchmarkForIndex =
  (index: number) => (info: Partial<BenchmarkInfo>) => {
    benchmarkInfo.update((b) => ({ ...b, [index]: { ...b[index], ...info } }));
  };

function startBenchmark() {
  benchmarks.forEach((benchmark, index) => {
    const update = updateBenchmarkForIndex(index);
    update({ status: "running" });
  });
}

export { startBenchmark, benchmarks };
