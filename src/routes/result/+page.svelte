<script lang="ts">
    import type { ActionData } from './$types';
    export let form: ActionData;
    import AppBar from "$lib/AppBar.svelte";
    import DialogueInput from "$lib/DialogueInput.svelte";
    import SuggestedResponse from "$lib/SuggestedResponse.svelte";

    let suggested = "This is a really really really long string that sits within the suggested response and can be displayed several times to provide some kind of insightful advice to those who require it."

    let playing = "";
    const speak = async (text: string) => {
        if (playing !== text) {
            playing = text;
            const utterThis = new SpeechSynthesisUtterance(text);
            utterThis.voice = speechSynthesis.getVoices()[1];
            speechSynthesis.cancel();
            speechSynthesis.speak(utterThis);

            utterThis.addEventListener("end", () => {
                playing = "";
            });
        } else {
            speechSynthesis.cancel();
            playing = "";
        }
    };
</script>

<AppBar title="✨ Results ✨" back/>

<DialogueInput disabled={true} yourMessage={form?.yourMessage} theirMessage={form?.theirMessage} />

<h2 class="text-xl text-center my-2">Translation</h2>

<div class="flex items-center justify-between space-x-4">
    <p class="mb-4">{form?.translation}</p>

    <button on:click={() => speak(form?.translation)} class={`btn ${playing === form?.translation ? 'btn-primary' : 'btn-neutral'}`}>
        {#if playing !== form?.translation}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
        {/if}
    </button>
</div>


<h2 class="text-xl text-center my-2">Suggested Responses</h2>

<div class="flex flex-col gap-4">
    {#each form?.suggestions as suggestion, i}
    <div class="flex items-center justify-between space-x-4">
        <SuggestedResponse index={i + 1} suggestion={suggestion} />
        <button on:click={() => speak(suggestion)} class={`btn ${playing === suggestion ? 'btn-primary' : 'btn-neutral'}`}>
            {#if playing !== suggestion}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
            {/if}
        </button>
    </div>    
    {/each}
</div>
