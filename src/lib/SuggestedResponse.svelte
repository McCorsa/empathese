<script lang="ts">
    import { goto } from "$app/navigation";
    import { youSaid } from '../stores/myStore';

    export var index: number;
    export var suggestion: string;
    export var playing: string;
    export var onspeak: () => Promise<void>;

    const useSuggestion = () => {
        sessionStorage.setItem("youSaid", suggestion);
        sessionStorage.setItem("theySaid", "");
        goto("/");
    }
</script>

<div class="flex flex-row items-start gap-3">
    <div class="bg-primary px-3 py-1 mt-1 rounded-full font-bold text-xl">
        {index}
    </div>
    <div class="flex flex-col gap-1 items-start">
        <div class="grow">{suggestion}</div>
        <div class="flex flex-row gap-2">
            <button class="btn btn-primary btn-sm" on:click={useSuggestion}>Try Response</button>
            <button on:click={onspeak} class={`btn ${playing === suggestion ? 'btn-primary' : 'btn-neutral'} btn-sm px-4`}>
                {#if playing !== suggestion}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                    </svg>
                {/if}
            </button>
            
        </div>
    </div>
</div>
