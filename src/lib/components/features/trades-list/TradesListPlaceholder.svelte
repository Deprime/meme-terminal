<script lang="ts">
  import { Skeleton } from "@/ui/skeleton";
</script>

<div 
  class="transition-colors duration-150 hover:bg-slate-400/10 odd:bg-slate-500/5 
  flex flex-shrink-0 items-center justify-between 
  h-8 min-w-max px-4"
>
  <div class="flex h-8 items-center min-w-40">
    <Skeleton class="h-4 w-14 rounded" />
  </div>
  <div class="flex h-8 items-center min-w-40">
    <Skeleton class="h-4 w-14 rounded" />
  </div>
  <div class="flex h-8 items-center min-w-40">
    <Skeleton class="h-4 w-14 rounded" />
  </div>
  <div class="flex h-8 items-center min-w-40">
    <Skeleton class="h-4 w-14 rounded" />
  </div>
  <div class="flex h-8 items-center min-w-40">
    <Skeleton class="h-4 w-14 rounded" />
  </div>
  <div class="flex  items-center justify-end min-w-40">
    <Skeleton class="h-4 w-14 rounded" />
  </div>
</div>