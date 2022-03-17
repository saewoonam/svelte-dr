<script>
	import CollapsibleSection from '../components/CollapsibleSection.svelte'
    
	let name = 'world';
	let plot_keys = ['A', 'B', 'Ca']
	let show_keys = [...plot_keys];
	let expanded=false;
	$:console.log(show_keys)
</script>

<h1>Hello {name}!</h1>
<CollapsibleSection headerText={'select items for plotting'} bind:choices={show_keys}/>
<!--
    <CollapsibleSection headerText={'select items for plotting'} bind:expanded={expanded} bind:choices={show_keys} menu={plot_keys} >
</CollapsibleSection>

-->
