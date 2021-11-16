<script>
  import { onMount } from "svelte";
  import { startBenchmark, benchmarkInfo, benchmarks } from "../benchmark";

  onMount(() => {
    startBenchmark();
  });

  let benchInfo;
  benchmarkInfo.subscribe((v) => (benchInfo = v));
</script>

{#each benchmarks as benchmark, index}
  <h1>{benchmark.title}</h1>
  <p>{benchInfo[index].status}</p>
  <p>JS time {benchInfo[index].jsTime}</p>
  <p>Rust time {benchInfo[index].rustTime}</p>
{/each}
