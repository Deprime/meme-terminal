<script lang="ts">
  import { goto } from "$app/navigation";

  // Constants
  import { TOKENS, CHAINS, type IToken } from "$lib/constants/app";

  // Components
  import { TokenImage, TokenMint } from "@/shared";

  // Methods
  const onTokenClick = (token: IToken) => {
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
      <div class="p-2">
        <h3 class="text-sm font-semibold text-slate-300">
          Launched
        </h3>
        <ul>
          {#each TOKENS as token (token.mint)}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <li 
              class="w-full flex gap-3 p-2"
              onclick={() => { onTokenClick(token) }}
            >
              <TokenImage {token} />
              <div class="w-full flex flex-col gap-0.5">
                <p class="w-full flex gap-0.5">
                  <span class="text-sm text-gray-300 font-semibold">
                    {token.title}
                  </span>
                  <span class="text-sm text-gray-400">
                    {token.symbol}
                  </span>
                </p>

                <TokenMint mint={token.mint} />
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
