<script lang="ts">
    import AppBar from '$lib/AppBar.svelte';
    import DialogueInput from '$lib/DialogueInput.svelte';
    
    import { onMount } from 'svelte';

    let youSaid: string, theySaid: string;
    let loading = false;

    // Subscribe to the store changes on component mount
    onMount(() => {
        youSaid = sessionStorage.getItem("youSaid") || "";
        theySaid = sessionStorage.getItem("theySaid") || "";
    });

    const handleSubmit = () => {
        sessionStorage.setItem("youSaid", youSaid);
        sessionStorage.setItem("theySaid", theySaid);
        loading = true;
    }
</script>

<AppBar title="EmpathEase" />

<form method="POST" action="/result" class="my-2">
    <label for="yourMessage" class="font-bold">You said</label>
    <input name="yourMessage" type="text" class={`input input-bordered w-full mb-3`} placeholder="What did you say?" bind:value={youSaid} readonly={loading} />
    <label for="theirMessage" class="font-bold">They said</label>
    <input name="theirMessage" type="text" class={`input input-bordered w-full mb-3`} placeholder="What did they say?" bind:value={theySaid} readonly={loading} />
    <div class="collapse bg-base-200 mb-3">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
            Advanced options
        </div>
        <div class="collapse-content flex flex-col gap-2">
            <div class="flex flex-col md:flex-row items-center gap-2">
                <label for="relationship" class="font-bold">Relationship</label>
                <select class="select w-full" name="relationship" >
                    <option selected>Partner</option>
                    <option>Friend</option>
                    <option>Family</option>
                    <option>Acquaintance</option>
                    <option>Colleague</option>
                    <option>Other / General</option>
                </select>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-2">
                <label for="quality" class="font-bold">Quality</label>
                <div class="join w-full md:w-auto md:mx-auto">
                    <input class="join-item btn grow border-primary md:px-8" type="radio" name="quality" aria-label="Helpful" value="helpful" checked />
                    <input class="join-item btn grow border-primary md:px-8" type="radio" name="quality" aria-label="Stupid" value="stupid" />
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