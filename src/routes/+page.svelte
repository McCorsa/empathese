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

    let recordingYou = false;
    let recordingThem = false;

    let chunks = [];
    let mediaRecorder: MediaRecorder;

    const recordYou = () => {
        if (!recordingYou) {
            recordingYou = true;
            // start recording in here
            navigator.mediaDevices
                .getUserMedia({audio: true})
                .then((stream) => {
                    mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.start()

                    mediaRecorder.onstop = async (e) => {
                        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                        chunks = [];
                        const audioURL = URL.createObjectURL(blob);
                        console.log(audioURL);

                        const response = await fetch("/api/dictation", {
                            method: "POST",
                            body: audioURL,
                            headers: {'content-type': 'plain/text'}
                        })

                        console.log(await response.text());
                    }

                    mediaRecorder.ondataavailable = (e) => {
                        chunks.push(e.data);
                    };
                })
                .catch((err) => {
                    console.error(`The following error occurred: ${err}`);
                });
        }
        else {
            // handle stopping the recording
            // when finished, set youSaid to result
            mediaRecorder.stop();
            recordingYou = false;
        }
    }

    const recordThem = () => {
        if (!recordingYou) {
            recordingYou = true;
            // start recording in here
        }
        else {
            // handle stopping the recording
            // when finished, set youSaid to result
            recordingYou = false;
        }
    }
</script>

<AppBar title="EmpathEase" />

<form method="POST" action="/result" class="my-2 flex flex-col">
    <label for="yourMessage" class="font-bold">You said</label>
    <div class="join join-horizontal">
        <input name="yourMessage" type="text" class={`input input-bordered w-full mb-3 join-item`} placeholder="What did you say?" bind:value={youSaid} readonly={loading} />
        <button class={`btn join-item ${recordingYou ? 'btn-primary' : 'btn-neutral'}`} on:click|preventDefault={recordYou}>
            {#if !recordingYou}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                </svg>
            {/if}
        </button>
    </div>
    <label for="theirMessage" class="font-bold">They said</label>
    <div class="join join-horizontal">
        <input name="theirMessage" type="text" class={`input input-bordered w-full mb-3 join-item`} placeholder="What did they say?" bind:value={theySaid} readonly={loading} />
        <button class={`btn join-item ${recordingThem ? 'btn-primary' : 'btn-neutral'}`} on:click|preventDefault={recordThem}>
            {#if !recordingThem}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                </svg>
            {/if}
        </button>
    </div>
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