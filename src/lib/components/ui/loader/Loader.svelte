<script lang="ts">
  // Types
  import type { ULoaderVariants } from "./types";

  // Props
  let {
    size = 'md',
    variant = 'green',
    ...other
  }: {
    size?: 'xs'|'sm'|'md'|'lg',
    variant?: ULoaderVariants
    class?: string
  } = $props();
</script>

<div
  class="{other.class || ''} rounded-full slt-loader slt-loader--variant-{variant} slt-loader--size-{size}"
>
</div>

<style lang="scss">
  @import "tailwindcss" reference;

  .slt-loader {
    animation: spinner 0.9s infinite linear;
    transition: all 450ms ease;

    &--variant {
      &-green {
        @apply border-green-300/20 border-r-green-500/90;
      }

      &-black {
        @apply border-green-600/30 border-r-green-600/90;
      }
    }

    &--size {

      &-xs {
        @apply size-3 border-[2px];
      }
      &-sm {
        @apply size-5 border-[3px];
      }
      &-md {
        @apply size-10 border-4;
      }

      &-lg {
        @apply size-16 border-[6px];
      }
    }
  }

  @keyframes spinner {
    to {
      transform: rotate(1turn);
    }
  }
</style>
