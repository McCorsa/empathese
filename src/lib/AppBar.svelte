<script lang="ts">
    import { goto } from "$app/navigation";
    import { youSaid, theySaid } from '../stores/myStore';

    export let title: string;
    export let back = false;
    export let yourMessage = "";
    export let theirMessage = "";

    const handleBack = () => {
        youSaid.set(yourMessage);
        theySaid.set(theirMessage);
        goto("/");
    }
</script>

<header class="flex flex-row">
    {#if back}
        <button class="btn btn-sm btn-primary" on:click={handleBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>              
        </button>
    {/if}
    <h1 class="text-2xl text-center mb-2 font-bold grow">{title}</h1>
</header>