<script lang="ts">
    import { goto } from "$app/navigation";

    export let title: string;
    export let back = false;
</script>

<header class="flex flex-row">
    {#if back}
        <button class="btn btn-sm btn-primary" on:click={() => window.history.back()}>B</button>
    {/if}
    <h1 class="text-2xl text-center mb-2 font-bold grow">{title}</h1>
</header>