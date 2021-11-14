<script>
  import { onMount } from "svelte";

  onMount(async () => {
    const aliceInWonderLand = await fetch(
      "https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt"
    ).then((res) => res.text());

    const testData = aliceInWonderLand.repeat(20);

    const jsWorker = new Worker("huffman-js-worker.js");

    const samples = 10;

    const timeStart = Date.now();
    await new Promise((resolve) => {
      const testJs = (count = 0) => {
        if (count > samples) {
          resolve();
          return;
        }

        jsWorker.postMessage(testData);
        jsWorker.onmessage = () => {
          testJs(count + 1);
        };
      };

      testJs();
    });
    const timeTaken = Date.now() - timeStart;
    const averageTime = timeTaken / samples;
    console.log(
      "Average time to encode 20 alice in wonderland texts: ",
      averageTime
    );

    jsWorker.terminate();
  });
</script>
