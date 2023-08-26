<script lang="ts">
    import { goto } from "$app/navigation";
    import { youSaid } from '../stores/myStore';

    export var index: number;
    export var suggestion: string;

    const useSuggestion = () => {
        sessionStorage.setItem("youSaid", suggestion);
        sessionStorage.setItem("theySaid", "");
        goto("/");
    }
</script>

<div class="flex flex-row items-start gap-3">
    <div class="bg-primary px-3 py-1 mt-1 rounded-full font-bold text-xl">
        {index}
    </div>
    <div class="flex flex-col gap-1 items-start">
        <div class="grow">{suggestion}</div>
        <button class="btn btn-primary btn-sm" on:click={useSuggestion}>Use Response</button>
    </div>
</div>
