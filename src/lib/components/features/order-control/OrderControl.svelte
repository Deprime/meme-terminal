<script>
  // import UButton from "@/ui/u-button/UButton.svelte";
  import { Button } from "$lib/components/ui/button";

  // Props
  let {
    disabled = true,
    onset = () => {}
  } = $props();
</script>

<div>
  <Button
    variant={disabled ? "default" : "secondary"}
    onclick={() => { }}
  >
    Set limit order
  </Button>

  <Button 
    variant="secondary"
    {disabled}
    onclick={() => { onset?.() }}
  >
    Set limit order
  </Button>
</div>

