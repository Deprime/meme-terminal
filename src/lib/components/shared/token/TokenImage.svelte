<script lang="ts">
  // Components
  import SolanaIcon from "@/icons/SolanaIcon.svelte";
  import PumpFunIcon from "@/icons/PumpFunIcon.svelte";

  // Services
  import { tippy } from "$lib/config/tippy";

  // Types
  import type { IToken } from "$lib/constants/app";

  // Props
  let {
    token,
    showChain = false,
    showLaunchpad = false,
    localImgSrc = false,
    size = "md",
  }: {
    token: IToken,
    showChain?: boolean,
    showLaunchpad?: boolean,
    localImgSrc?: boolean,
    size?: "xs" | "sm" | "md" | "lg",
  } = $props(); 

  let imgSrc = $derived.by(() => {
    if (localImgSrc) {
      const name = token.symbol.toLowerCase();
      return `/img/tokens/${name}.webp`;
    }
    return token.img;
  })
</script>

<div class="size-fit relative rounded-full p-px bg-transparent">
  <figure class="rounded-full overflow-hidden bg-stone-950 outline outline-offset-0 outline-stone-700"
    class:size-10={size === 'xs'}
    class:size-12={size === 'sm'}
    class:size-14={size === 'md'}
    class:size-16={size === 'lg'}
  >
    <img 
      src={imgSrc} 
      alt={token.symbol} 
      class="size-full object-cover"
    >
  </figure>

  {#if showLaunchpad}
    <div 
      class="absolute bottom-0 left-0 z-[2] rounded-full size-3.5 flex items-center justify-center bg-stone-900 outline outline-offset-0 outline-cyan-900"
      use:tippy={{ content: "Pump.fun" }}
    >
      <PumpFunIcon size={10}  />
    </div>
  {/if}

  {#if showChain}
    <div 
      class="absolute bottom-0 right-0 rounded-full size-3 flex items-center justify-center bg-stone-900 outline outline-offset-0 outline-cyan-900"
    >
      <SolanaIcon size={8}  />
    </div>
  {/if}
</div>