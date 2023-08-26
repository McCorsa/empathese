<script lang="ts">
    import AppBar from '$lib/AppBar.svelte';
    import DialogueInput from '$lib/DialogueInput.svelte';
    
    import { myStore } from '../stores/myStore';
    import { onMount } from 'svelte';

    let storeValue: string;

    // Subscribe to the store changes on component mount
    onMount(() => {
        const unsubscribe = myStore.subscribe(value => {
        storeValue = value;
        });

        return unsubscribe;
    });
</script>

<AppBar title="EmpathEase" />

<form method="POST" action="/result" class="my-2">
    <label for="" class="font-bold">You said</label>
    <input name="yourMessage" type="text" class={`input input-bordered w-full mb-3 rounded-lg`} placeholder="What did you say?" bind:value={storeValue} />
    <label for="" class="font-bold">They said</label>
    <input name="theirMessage" type="text" class={`input input-bordered w-full mb-3 rounded-lg`} placeholder="What did they say?" />
    <button type="submit" class="btn btn-block btn-primary rounded-lg">Submit</button>
</form>