<script>
    export let states = [
        {id: 1, text: 'manual'},    
        {id: 2, text: 'unknown'},   
        {id: 3, text: 'warming to 300K'},   
        {id: 4, text: 'cooling to 4K'}, 
        {id: 5, text: 'Warm pump'}, 
        {id: 6, text: 'Keep pump hot'}, 
        {id: 7, text: 'Cool pump'}, 
        {id: 8, text: 'Cold'},  
    ];
    export let selected = states[3];
  $: { console.log("in selector", selected) }
</script>
<select bind:value={selected}>
    {#each states as state}
    <option value={state}>
        {state.text}
    </option>
    {/each}
</select>
