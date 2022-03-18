<script>
    import { createEventDispatcher } from 'svelte'
    import collapse from 'svelte-collapse'
    export let label='my collapse'
	export let menu = ['A', 'B', 'C']
    export let choices = [...menu];
    export let open = false
    export let duration = 0.2
    export let easing = 'ease'
    const dispatch = createEventDispatcher()
    function handleToggle () {
        open = !open
        if (open) {
            dispatch('open')
        }
        else {
            dispatch('close')
        }
    }
</script> 

<style>
	.config { margin: 1em}

    .card-header {
        cursor: pointer;
        user-select: none;
    }
	.card-header:hover {
  color: #FF0000;
}
</style>

<div class='config' class:open aria-expanded={open} >

    <div class='card-header' on:click={handleToggle}
         style="margin:0.5em;cursor:pointer"
         onmouseover="this.style.color='red';" onmouseout="this.style.color='';"
         >
        {label}
    </div>

    <div class='card-body' use:collapse={{open, duration, easing}}>
			{#each menu as item}                                                
			<label>                                                         
				<input type=checkbox bind:group={choices} name="choices" value={item}>
				{item}                                                      
			</label>                                                        
			{/each}   
    </div>

</div>

