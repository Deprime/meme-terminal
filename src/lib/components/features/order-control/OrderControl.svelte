<script>
  import Button from "$lib/components/ui/button/Button.svelte";

  // Props
  let {
    disabled = true,
    onset = () => {}
  } = $props();
</script>

<div>
  <Button 
    {disabled}
    variant="primary-outline"
    onclick={() => { onset?.() }}
  >
    Set limit order
  </Button>
</div>

