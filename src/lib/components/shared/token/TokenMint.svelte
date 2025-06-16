<script lang="ts">
  import { copy } from '@svelte-put/copy';

  // Components
  import CopyIcon from "@lucide/svelte/icons/copy";
  import CheckIcon from "@lucide/svelte/icons/check";

  // Props
  let {
    mint,
    onclick,
    ...other
  }: {
    mint: string,
    onclick?: (e: Event) => void,
    class?: string
  } = $props(); 

  // Data
  let copied = $state(false);

  let shortMint = $derived.by(() => {
    const length = mint.length;
    const prefix = mint.substring(0, 5);
    const suffix = mint.substring(length - 4, length - 1);
    return `${prefix}...${suffix}`;
  });

  const onCopied = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1_000);

    onclick?.(e);
  }
</script>

  <button 
    class="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-2 p-0.5 cursor-pointer {other?.class}"
    use:copy={{ text: mint }} 
    oncopied={onCopied}
  >
    <span>
      {shortMint}
    </span>
    {#if copied}
      <CheckIcon size={12} />
    {:else}
      <CopyIcon size={12} />
    {/if}
  </button>