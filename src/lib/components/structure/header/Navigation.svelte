<script lang="ts">
  import { page } from "$app/state";

  // Constants
  import { ROUTES } from "$lib/constants/routes";

  // Data
  let navigation = $derived.by(() => {
    const { pathname } = page.url;
    return ROUTES.map(el => {
      return {
        ...el,
        active: el.url === pathname,
      }
    });
  });
</script>

<nav>
  <ul>
    {#each navigation as nav (nav.title)}
      <li 
        class="rounded-md hover:text-gray-200 transition-all"
        class:text-gray-400={!nav.active}
        class:text-gray-200={nav.active}
      >
        <a 
          href={nav.url}
          class="flex px-4 py-1.5 text-sm font-semibold"
        >
          {nav.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>