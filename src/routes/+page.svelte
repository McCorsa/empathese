<script lang="ts">
    import AppBar from '$lib/AppBar.svelte';
    import DialogueInput from '$lib/DialogueInput.svelte';
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<AppBar title="EmpathEase" />

<form method="POST" action="/result" class="my-2">
    <label for="" class="font-bold">You said</label>
    <input type="text" class={`input input-bordered w-full mb-3 rounded-lg`} placeholder="What did you say?" />
    <label for="" class="font-bold">They said</label>
    <input type="text" class={`input input-bordered w-full mb-3 rounded-lg`} placeholder="What did they say?" />
    <button type="submit" class="btn btn-block btn-primary rounded-lg">Submit</button>
</form>