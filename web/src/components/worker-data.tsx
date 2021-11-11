import { useEffect, useState } from "react";

interface IProps {
  workerScript: string;
  type?: WorkerType;
}

export function WorkerData({ workerScript, type = "classic" }: IProps) {
  const [data, setData] = useState("");
  useEffect(() => {
    const worker = new Worker(workerScript, {
      name: "my-worker",
      type,
    });
    worker.onmessage = function (e) {
      setData(e.data);
    };
  }, []);

  return <span>{data}</span>;
}
