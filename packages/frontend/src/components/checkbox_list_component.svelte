<script>
    export let controls = [
        { value: false, text: 'Pump on' },
        { value: false, text: 'Switch on' },
        { value: false, text: 'Compressor' },
        { value: false, test: 'Enable heaters'}
    ];
    export let manual_mode = true;
</script>
<style>
    .disabled {
        opacity: 0.4;
    }
    label {
      width: 100%;
      display: inline-block;
    }
</style>
<br>
<div >
            <label>
            <input
            type=checkbox
            bind:checked={manual_mode}
            >
        &nbsp Manual Mode
        </label>
{#each controls as control}
        <label class:disabled={!manual_mode}>
            <input
            type=checkbox
            bind:checked={control.value}
            disabled = '{!manual_mode}'
            >
        &nbsp&nbsp{control.text}
        </label>
{/each}
</div>
