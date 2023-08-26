<script lang="ts">
    import AppBar from "$lib/AppBar.svelte";
    import DialogueInput from "$lib/DialogueInput.svelte";
    import SuggestedResponse from "$lib/SuggestedResponse.svelte";

    let suggested = "This is a really really really long string that sits within the suggested response and can be displayed several times to provide some kind of insightful advice to those who require it."
</script>

<AppBar title="Translation" />

<DialogueInput disabled={true} />

<h2 class="text-xl text-center mb-2">Suggested Responses</h2>

<div class="flex flex-col gap-4">
    <SuggestedResponse index={1} suggestion={suggested} />
    <SuggestedResponse index={2} suggestion={"Some useful suggestion of what you could say back."} />
    <SuggestedResponse index={3} suggestion={"Some useful suggestion of what you could say back."} />
</div>
