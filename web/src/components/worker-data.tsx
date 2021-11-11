import { useEffect, useState } from "react";

interface IProps {
  workerScript: string;
  type?: WorkerType;
  prettyPrintNumber?: boolean;
}

export function WorkerData({
  workerScript,
  type = "classic",
  prettyPrintNumber = false,
}: IProps) {
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

  return <span>{prettyPrintNumber ? data.toLocaleString("en-US") : data}</span>;
}
