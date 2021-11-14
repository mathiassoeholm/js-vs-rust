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
  {
    title: "temp temp temp",
    jsWorkerPath: "md5-js-worker.js",
    rustWorkerPath: "md5-rust-worker.js",
  },
  {
    title: "💩",
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

async function startBenchmark() {
  for (let index = 0; index < benchmarks.length; index++) {
    const benchmark = benchmarks[index];
    const update = updateBenchmarkForIndex(index);

    update({ status: "running" });

    const profile = async (language: "js" | "rust") =>
      await new Promise<void>((resolve) => {
        const worker = new Worker(benchmark[`${language}WorkerPath`]);
        worker.onmessage = (e) => {
          const time = e.data;
          update({ [`${language}Time`]: time });
          worker.terminate();
          resolve();
        };
      });

    await profile("js");
    await profile("rust");

    update({ status: "done" });
  }
}

export { startBenchmark, benchmarks, benchmarkInfo };
