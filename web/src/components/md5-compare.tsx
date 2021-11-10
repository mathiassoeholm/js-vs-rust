import { useEffect } from "react";

export function Md5Compare() {
  useEffect(() => {
    const rustWorker = new Worker("rust-worker.js", { type: "module" });
    rustWorker.onmessage = function (e) {
      // rustHashes.textContent = e.data.toLocaleString("en-US");
      console.log(e.data);
    };
  }, []);

  return <p>hello</p>;
}
