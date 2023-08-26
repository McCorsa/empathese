<script lang="ts">
    import type { ActionData } from './$types';
    export let form: ActionData;
    import AppBar from "$lib/AppBar.svelte";
    import DialogueInput from "$lib/DialogueInput.svelte";
    import SuggestedResponse from "$lib/SuggestedResponse.svelte";

    let suggested = "This is a really really really long string that sits within the suggested response and can be displayed several times to provide some kind of insightful advice to those who require it."
</script>

<AppBar title="Translation" back />

<DialogueInput disabled={true} yourMessage={form?.yourMessage} theirMessage={form?.theirMessage} />

<h2 class="text-xl text-center my-2">Translation</h2>

<p class="mb-4">{form?.translation}</p>

<h2 class="text-xl text-center my-2">Suggested Responses</h2>

<div class="flex flex-col gap-4">
    {#each form?.suggestions as suggestion, i}
        <SuggestedResponse index={i + 1} suggestion={suggestion.response} />
    {/each}
</div>
