<script>
  import { onMount } from "svelte";

  let rustData = 0;
  let jsData = 0;

  onMount(() => {
    new Worker("rust-worker.js", {
      type: "module",
    }).onmessage = (e) => {
      rustData += 1000000;
    };

    new Worker("js-worker.js").onmessage = (e) => {
      jsData += 1000000;
    };
  });
</script>

<article
  class="max-w-screen-lg mx-auto p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-100 to-gray-200 flex"
>
  <div class="flex-1">
    <h2 class="text-3xl font-bold">MD5 Hashing</h2>
    <p>Hashing a continously increasing integer, starting at 1</p>
    <p>
      Hashes made by Rust: {rustData.toLocaleString("en-US")}
    </p>
    <p>
      Hashes made by JS: {jsData.toLocaleString("en-US")}
    </p>
  </div>
  <p class="flex flex-col justify-center items-center text-2xl">
    <span class="text-4xl font-bold min-w-[5ch] text-center"
      >{rustData > 0 && jsData > 0
        ? Math.round((rustData / jsData - 1) * 100)
        : 0}%</span
    >faster
  </p>
</article>
