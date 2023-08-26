<script lang="ts">
    import { goto } from "$app/navigation";
    import { youSaid } from '../stores/myStore';

    export var index: number;
    export var suggestion: string;
</script>

<div class="flex flex-row items-start gap-3">
    <div class="bg-primary px-3 py-1 mt-1 rounded-full font-bold text-xl">
        {index}
    </div>
    <div class="flex flex-col gap-1 items-start">
        <div class="grow">{suggestion}</div>
        <button class="btn btn-primary btn-sm" on:click={() => {youSaid.set(suggestion); goto("/")}}>Use Response</button>
    </div>
</div>
