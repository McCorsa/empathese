<script lang="ts">
    import AppBar from '$lib/AppBar.svelte';
    import DialogueInput from '$lib/DialogueInput.svelte';
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<AppBar title="EmpathEase" />
<DialogueInput />