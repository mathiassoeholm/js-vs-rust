import { useEffect, useState } from "react";

interface IProps {
  workerScript: string;
}

export function WorkerData({ workerScript }: IProps) {
  const [data, setData] = useState("");
  useEffect(() => {
    const rustWorker = new Worker(workerScript, { type: "module" });
    rustWorker.onmessage = function (e) {
      setData(e.data);
    };
  }, []);

  return <span>{data}</span>;
}
