<script lang="ts">
    export let disabled = false;
    export let yourMessage = '';
    export let theirMessage = '';
</script>

<form method="POST" action="/result" class="my-2">
    <label for="" class="font-bold">You said</label>
    <input type="text" class={`input input-bordered w-full mb-3 rounded-lg ${disabled && 'input-sm'}`} placeholder="What did you say?" bind:value={yourMessage} disabled={disabled} />
    <label for="" class="font-bold">They said</label>
    <input type="text" class={`input input-bordered w-full mb-3 rounded-lg ${disabled && 'input-sm'}`} placeholder="What did they say?" bind:value={theirMessage} disabled={disabled} />
    {#if !disabled}
        <button class="btn btn-neutral w-full rounded-lg">Submit</button>
    {/if}
</form>