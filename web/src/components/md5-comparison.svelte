<script>
  import { onMount } from "svelte";

  let rustData;

  onMount(() => {
    const rustWorker = new Worker("rust-worker.js", {
      name: "my-worker",
      type: "module",
    });

    rustWorker.onmessage = function (e) {
      rustData = e.data;
    };
  });
</script>

<p>hello {rustData}</p>
