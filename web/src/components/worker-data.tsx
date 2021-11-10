import { useEffect, useState } from "react";

interface IProps {
  workerScript: string;
}

export function WorkerData({ workerScript }: IProps) {
  const [data, setData] = useState("");
  useEffect(() => {
    // new Worker(new URL("../workers/js-worker.js", import.meta.url));
    const worker = new Worker(
      new URL(`../workers/${workerScript}`, import.meta.url),
      {
        name: "my-worker",
        type: "module",
      }
    );
    worker.onmessage = function (e) {
      setData(e.data);
    };
  }, []);

  return <span>{data}</span>;
}
