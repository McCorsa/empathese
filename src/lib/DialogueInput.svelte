<script lang="ts">
    export let disabled = false;
</script>

<form action="/">
    <label for="" class="font-bold">You said</label>
    <input type="text" class="input input-bordered w-full mb-3 rounded-lg" placeholder="What did you say?" disabled={disabled} />
    <label for="" class="font-bold">They said</label>
    <input type="text" class="input input-bordered w-full mb-3 rounded-lg" placeholder="What did they say?" disabled={disabled} />
    <button class="btn btn-neutral w-full rounded-lg">Submit</button>
</form>