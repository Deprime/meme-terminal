<script lang="ts">
  import { copy, type CopyDetail } from '@svelte-put/copy';

  // Components
  import CopyIcon from "@lucide/svelte/icons/copy";

  let wallet = 'sdfdfgdf...sdfsdf '
</script>

<div class="">
  <div>

  </div>
  <div class="wallet">
    <span>
      {wallet}
    </span>

    <button use:copy={{ text: wallet }} >
      <CopyIcon />
    </button>
  </div>
</div>