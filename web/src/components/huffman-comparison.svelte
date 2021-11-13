<script>
  import { onMount } from "svelte";

  onMount(() => {
    const worker = new Worker("huffman-js-worker.js");
    worker.onmessage = (e) => {
      document.write(e.data);
    };
    worker.postMessage("hej med dig jeg hedder mathias");
  });
</script>
