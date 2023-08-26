<script lang="ts">
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<h1 class="text-3xl font-black">Welcome to SvelteKit</h1>
<!-- <p>My message is "{data.message}"</p> -->
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/" class="btn btn-primary">test</a>

<br>
<p>My message is "{data.translation}"</p>
{#each data.suggestions as suggestion}
    <p>{suggestion.title}: {suggestion.response}</p>
{/each}
<br>