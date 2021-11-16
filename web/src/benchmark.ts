import { writable } from "svelte/store";

interface Benchmark {
  title: string;
  jsWorkerPath: string;
  rustWorkerPath: string;
  jsWorkerType?: WorkerType;
  rustWorkerType?: WorkerType;
  workerArgument?: () => Promise<any>;
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
    rustWorkerType: "module",
  },
  {
    title: "Huffman encode",
    jsWorkerPath: "huffman-js-worker.js",
    rustWorkerPath: "huffman-js-worker.js",
    async workerArgument() {
      const aliceInWonderLand = await fetch(
        "https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt"
      ).then((res) => res.text());

      return aliceInWonderLand.repeat(20);
    },
  },
  {
    title: "💩",
    jsWorkerPath: "md5-js-worker.js",
    rustWorkerPath: "md5-rust-worker.js",
    rustWorkerType: "module",
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

    const profile = async (language: "js" | "rust") => {
      let argument: any | undefined;
      if (benchmark.workerArgument) {
        await benchmark.workerArgument();
      }

      await new Promise<void>((resolve) => {
        const worker = new Worker(benchmark[`${language}WorkerPath`], {
          type: benchmark[`${language}WorkerType`] ?? "classic",
        });

        if (argument) {
          worker.postMessage(argument);
        }

        worker.onmessage = (e) => {
          const time = e.data;
          update({ [`${language}Time`]: time });
          worker.terminate();
          resolve();
        };
      });
    };

    await profile("js");
    await profile("rust");

    update({ status: "done" });
  }
}

export { startBenchmark, benchmarks, benchmarkInfo };
