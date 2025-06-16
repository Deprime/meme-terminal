<script lang="ts">
  import { TOKEN, type IToken } from "$lib/constants/app";

  // Components
  import CopyIcon from "@lucide/svelte/icons/copy";

  // Props
  let {
    token
  }: {
    token: IToken
  } = $props();

  let src = $state(`/img/tokens/${TOKEN.title.toLocaleLowerCase()}.webp`);
</script>

<div class="flex justify-between items-center gap-3 p-2">
  <img 
    {src} 
    alt={TOKEN.title} 
    class="size-11 rounded-full"
  >

  <div class="flex flex-col w-full">
    <div class="flex gap-2 items-center">
      <p class="text-lg leading-6 font-semibold text-gray-200">
        {TOKEN.title}
      </p>
      <p class="text-xs text-gray-400">
        {TOKEN.title}
      </p>
    </div>

    <div class="flex items-center cursor-pointer text-gray-400 hover:text-gray-200">
      <p class="w-full truncate underline text-xs max-w-32">
        {TOKEN.mint}
      </p>
      <!-- <a 
        href="https://solscan.io/token/{TOKEN.mint}" 
        target="_blank" 
      >
      </a> -->
      <CopyIcon size={16} />
    </div>
  </div>
</div>