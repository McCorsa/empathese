<script lang="ts">
    import AppBar from '$lib/AppBar.svelte';
    import DialogueInput from '$lib/DialogueInput.svelte';
    
    import { youSaid, theySaid } from '../stores/myStore';
    import { onMount } from 'svelte';

    let youSaidVal: string, theySaidVal: string;
    let loading = false;

    // Subscribe to the store changes on component mount
    onMount(() => {
        const unsubscribeYouSaid = youSaid.subscribe(value => {
            youSaidVal = value;
        });
        const unsubscribeTheySaid = theySaid.subscribe(value => {
            theySaidVal = value;
        });

        return unsubscribeTheySaid;
    });

    const handleSubmit = () => {
        loading = true;
    }
</script>

<AppBar title="EmpathEase" />

<form method="POST" action="/result" class="my-2">
    <label for="yourMessage" class="font-bold">You said</label>
    <input name="yourMessage" type="text" class={`input input-bordered w-full mb-3`} placeholder="What did you say?" bind:value={$youSaid} />
    <label for="theirMessage" class="font-bold">They said</label>
    <input name="theirMessage" type="text" class={`input input-bordered w-full mb-3`} placeholder="What did they say?" bind:value={$theySaid} />
    <div class="collapse bg-base-200 mb-3">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
            Advanced options
        </div>
        <div class="collapse-content flex flex-col gap-2">
            <div class="flex flex-col md:flex-row items-center gap-2">
                <label for="relationship" class="font-bold">Relationship</label>
                <select class="select w-full" name="relationship">
                    <option selected>Partner</option>
                    <option>Friend</option>
                    <option>Family</option>
                    <option>Acquaintance</option>
                    <option>Colleague</option>
                    <option>Other / General</option>
                </select>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-2">
                <label for="tone" class="font-bold">Tone of Voice</label>
                <select class="select w-full" name="tone">
                    <option disabled selected>Choose the tone of the conversation</option>
                    <option>Casual</option>
                    <option>Happy</option>
                    <option>Playful</option>
                    <option>Angry</option>
                    <option>Sad</option>
                    <option>Bored</option>
                    <option>Confused</option>
                    <option>Serious</option>
                    <option>Unsure</option>
                </select>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-2">
                <label for="quality" class="font-bold">Quality</label>
                <div class="join w-full md:w-auto md:mx-auto">
                    <input class="join-item btn grow border-primary md:px-8" type="radio" name="quality" aria-label="Helpful" checked />
                    <input class="join-item btn grow border-primary md:px-8" type="radio" name="quality" aria-label="Stupid" />
                </div>
            </div>
        </div>
      </div>
    <button type="submit" class="btn btn-block btn-primary rounded-lg" on:click={handleSubmit} disabled={loading}>
        {#if loading}
            <span class="loading loading-dots loading-lg"></span>
        {:else}
            Submit
        {/if}
    </button>
</form>