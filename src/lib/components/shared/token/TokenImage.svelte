<script lang="ts">
  // Components
  import SolanaIcon from "@/icons/SolanaIcon.svelte";

  // Types
  import type { IToken } from "$lib/constants/app";

  // Props
  let {
    token,
    showChain = true,
  }: {
    token: IToken,
    showChain?: boolean,
  } = $props(); 
</script>

<div class="size-fit relative rounded-full p-px bg-transparent">
  <figure class="size-14 rounded-full overflow-hidden bg-stone-950 outline outline-offset-0 outline-stone-700">
    <img 
      src={token.img} 
      alt={token.symbol} 
      class="size-full object-cover"
    >
  </figure>

  {#if showChain}
    <div class="absolute bottom-0 right-0 rounded-full size-3 flex items-center justify-center bg-stone-900 outline outline-offset-0 outline-cyan-900">
      <SolanaIcon size={8}  />
    </div>
  {/if}
</div>