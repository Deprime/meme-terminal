<script lang="ts">
  import { TOKEN } from "$lib/constants/app";

  let src = $state(`/img/tokens/${TOKEN.title.toLocaleLowerCase()}.webp`);
</script>

<div class="flex justify-between items-center gap-3 py-1.5 px-2 text-gray-700 bg-stone-100 rounded-lg p-2 text-xs">
  <img {src} alt={TOKEN.title} class="size-8 rounded-full">
  <div class="flex flex-col w-full max-w-52">
    <p class="font-bold">
      {TOKEN.title}
    </p>
    <a 
      href="https://solscan.io/token/{TOKEN.mint}" 
      target="_blank" 
      class="w-full truncate text-green-600 underline"
    >
      {TOKEN.mint}
    </a>
  </div>
</div>