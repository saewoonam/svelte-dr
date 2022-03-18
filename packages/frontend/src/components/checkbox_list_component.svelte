<script>
    export let controls = [
        { value: false, text: 'He3 Pump A on' },
        { value: false, text: 'He3 Pump B on' },
        { value: false, text: 'He4 Pump A on' },
        { value: false, text: 'He4 Pump B on' },
        { value: false, text: 'He3 Heat Switch A on' },
        { value: false, text: 'He3 Heat Switch B on' },
        { value: false, text: 'He4 Heat Switch A on' },
        { value: false, text: 'He4 Heat Switch B on' },
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
<div style="margin:0.5em">
    <label>
        <input
                type=checkbox
                bind:checked={manual_mode}
                >
                &nbsp Heaters Manual Mode
    </label>
    {#if manual_mode}
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
    {/if}
</div>
