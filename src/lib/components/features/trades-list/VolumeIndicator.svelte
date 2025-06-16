<script lang="ts">
  let {
    type,
    volume = 0,
  } : {
    type: "buy" | "sell"
    volume: number,
  } = $props();
</script>

<div
  class="absolute left-0 top-0 h-full bg-gradient-to-r 
    {type === "buy" 
      ? "from-green-900/0  to-green-400/10" 
      : "from-[#D139EC]/0 to-red-600/15"}
  "
  style="width: {volume * 1.5}%"
></div>
