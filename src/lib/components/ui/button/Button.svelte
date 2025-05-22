<script lang="ts">
  import { type Snippet } from 'svelte';

  // Components
  import Loader from '../loader/Loader.svelte';

  // Types
  import type { ULoaderVariants } from '../loader/types';
  type TButtonVariant = 'primary' | 'primary-outline' | 'secondary' | 'text';
  type TButtonSize = 'sm' | 'md' | 'lg';

  interface IButton {
    variant?: TButtonVariant,
    size?: TButtonSize,
    block?: boolean,
    disabled?: boolean,
    loading?: boolean,
    wrapperClass?: string,
    children?: Snippet,
    onclick?: () => void,
    class?: string
  }

  // Props
  let {
    variant = 'primary',
    size = 'md',
    block = false,
    disabled = false,
    loading = false,
    wrapperClass = '',
    onclick,
    children,
    ...other
  }: IButton = $props();

  // Data
  const outlineVariants = ['primary-outline', 'secondary',  'yellow-outline'];
  let loadingVariant: ULoaderVariants = $state(outlineVariants.includes(variant) ? "green" : "black");

  // Reactive
  let cssClass = $derived.by(() => {
    return [
      `dcr-button`,
      `dcr-button--variant-${variant}`,
      `dcr-button--size-${size}`,
      block ? ' dcr-button--block' : '',
      other?.class
    ].join(' ');
  });

  /**
   * On click
   */
  function onClick() {
    if (disabled)
      return;
    onclick?.();
  }
</script>

<button
  type="button"
  class={cssClass}
  {disabled}
  onclick={onClick}
>
  {#if loading}
    <Loader size="sm" variant={loadingVariant} class="absolute" />
  {/if}
  <div
    class:opacity-0={loading}
    class="inline-flex justify-center items-center text-center {wrapperClass}"
  >
    {@render children?.()}
  </div>
</button>

<style lang="scss">
  @import "tailwindcss" reference;

  .dcr-button {
    @apply relative;
    @apply flex items-center justify-center;
    @apply font-medium subpixel-antialiased;
    @apply select-none;

    &:not(:disabled) {
      @apply transition-all;
      @apply cursor-pointer;
    }

    &:disabled {
      @apply grayscale-100;
    }

    &--block {
      @apply w-full;
    }

    &--size {
      &-sm {
        @apply px-2 py-1.5;
        @apply rounded-md;
        @apply text-xs;
      }

      &-md {
        @apply px-3 py-2;
        @apply rounded-md;
        @apply text-sm;
      }

      &-lg {
        @apply px-5 py-3;
        @apply rounded-lg;
        @apply text-base;
      }
    }

    &--variant {
      &-secondary {
        @apply text-white;
        @apply bg-white/10;
        @apply border border-white/10;
      }

      &-primary {
        @apply text-gray-800;
        @apply border border-green-400 bg-green-400;
      }

      &-primary-outline {
        @apply text-green-600;
        @apply border border-green-600;
        @apply bg-green-600/10;
      }
  
      &-text {
        @apply text-stone-700;
        @apply bg-transparent;
        @apply border border-transparent;
      }
    }
  }
</style>
