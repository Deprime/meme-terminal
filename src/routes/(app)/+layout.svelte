<script lang="ts">
  import { resetMode, setMode } from "mode-watcher";

  // Components
  import SolanaIcon from "@/icons/SolanaIcon.svelte";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import LanguagesIcon from "@lucide/svelte/icons/languages";

  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { buttonVariants, Button } from "$lib/components/ui/button";

  // Props
	let { children } = $props();

  const themes = [{
    label: "Light",
    tag: "light",
    callback: () => {
      setMode("light")
    },
  }, {
    label: "Dark",
    tag: "dark",
    callback: () => {
      setMode("dark")
    },
  }, {
    label: "System",
    tag: "system",
    callback: () => {
      resetMode()
    },
  },]
</script>

<main class="flex flex-col w-full h-dvh">
  <header class="flex items-center justify-between p-2 border-b border-stone-800">
    <div>

    </div>
    <div class="flex items-center gap-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger 
          class={buttonVariants({ variant: "outline" })}
        >
          <SettingsIcon />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56" align="end">
          <DropdownMenu.Group>
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <LanguagesIcon />
                <span>Language</span>
              </DropdownMenu.Item>

              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>
                  <MoonIcon />
                  <span>Theme</span>
                </DropdownMenu.SubTrigger>

                <DropdownMenu.SubContent align="end">
                  {#each themes as theme (theme.tag)}
                    <DropdownMenu.Item onclick={() => { theme.callback() }}>
                      {theme.label}
                    </DropdownMenu.Item>
                  {/each}
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Group>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Button variant="secondary">
        Connect wallet
      </Button>
    </div>
  </header>

  <div class="h-full flex">
    <aside class="w-80 border-r border-r-stone-800">
    </aside>

    <div class="w-full">
      {@render children()}
    </div>

    <aside class="w-md border-l border-l-stone-800">
      <h4 class="text-sm text-gray-400 p-2 text-center font-semibold select-none">
        Trading tools
      </h4>
    </aside>
  </div>

  <footer class="w-full h-10 flex items-center justify-between border-t border-stone-800">
    <div></div>
    <div class="flex items-center px-2">
      <div class="flex items-center gap-1.5">
        <SolanaIcon /> 
        <span class="text-xs text-sky-500">
          $147.31
        </span>
      </div>
    </div>
  </footer>
</main>
