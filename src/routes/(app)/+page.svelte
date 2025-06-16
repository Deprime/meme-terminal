<script lang="ts">
  import { goto } from "$app/navigation";

  // Constants
  import { TOKENS, CHAINS, type IToken } from "$lib/constants/app";

  // Components
  import { TokenImage, TokenMint } from "@/shared";
  import { Separator } from "@/ui/separator";

  // Methods
  const onTokenClick = (e: Event, token: IToken) => {
    e.preventDefault();
    const url = `/${CHAINS.SOL.symbol}/${token.symbol}`;
    goto(url);
  }
</script>

<div class="flex flex-col w-full h-full">
  <div class="w-full h-14 border-b border-b-stone-800">

  </div>
  <div class="grid grid-cols-3 h-full">
    <div class="border-r border-r-stone-800">
      <div class="p-2">
        <h3 class="text-sm font-semibold text-slate-300">
          New tokens
        </h3>
      </div>
    </div>

    <div class="border-r border-r-stone-800">
      <div class="p-2">
        <h3 class="text-sm font-semibold text-slate-300">
          Soon will filled
        </h3>
      </div>
    </div>

    <div class="">
      <div>
        <header class="py-2 px-4">
          <h3 class="text-sm font-semibold text-slate-300">
            Launched
          </h3>
        </header>

        <ul>
          {#each TOKENS as token (token.mint)}
            <li class="relative z-[2] flex gap-3 py-3 px-4 w-full cursor-pointer transition-colors  hover:bg-stone-800/50 border-b border-b-stone-800/50">
              <a 
                href="/{CHAINS.SOL.symbol}/{token.symbol}" 
                aria-label="listitem"
                class="absolute inset-0 z-[1]"
              >
              </a>

              <TokenImage {token} localImgSrc showLaunchpad />
              <div class="w-fit flex flex-col gap-0.5">
                <p class="w-full flex gap-1">
                  <span class="text-sm text-gray-300 font-semibold">
                    {token.title}
                  </span>
                  <span class="text-sm text-gray-400">
                    {token.symbol}
                  </span>
                </p>

                <div class="flex gap-2">
                  <span class="text-sm text-teal-500">
                    21m
                  </span>
                  <Separator orientation="vertical" />
                  <TokenMint 
                    class="relative z-[3]" 
                    mint={token.mint} 
                  />
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
