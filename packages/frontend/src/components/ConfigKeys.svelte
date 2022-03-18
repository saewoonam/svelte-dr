<script>
    import { CollapsibleCard } from 'svelte-collapsible'
    export let label = 'collapsible list'
    export let menu = ['A', 'B', 'C']
    export let choices = [...menu];
</script>

<CollapsibleCard open={false} on:open on:close>
    <h4 slot='header' class='header'>{label}</h4>
    <p slot='body' class='body'>
    {#each menu as item}
        <label>
            <input type=checkbox bind:group={choices} name="choices" value={item}>
            {item}
        </label>
    {/each}
    </p>
</CollapsibleCard>
