<script lang="ts">
  import { resetMode, setMode } from "mode-watcher";

  // Components
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import LanguagesIcon from "@lucide/svelte/icons/languages";

  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button, buttonVariants } from "$lib/components/ui/button";

  // Themes
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
  }]
</script>
  
  <header class="flex items-center justify-between p-2 border-b border-stone-800">
    <div></div>
    <div class="flex items-center gap-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "sm" })}>
          <SettingsIcon size={24} class="text-gray-500" />
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

      <Button variant="secondary" size="sm">
        Connect wallet
      </Button> 
    </div>
  </header>