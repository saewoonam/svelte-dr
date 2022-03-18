<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let label='More Info'
	export let menu = ['A', 'B', 'C']
	export let choices = [...menu];

	function handleCheck(e) {
		//console.log('handleCheck', e.srcElement.checked, e.target.checked)
		if (e.target.checked) dispatch('open')
		else dispatch('close');
	}
</script>

<div class="wrap-collabsible">
    <input id="collapsible" class="toggle"
                            type="checkbox"
                            style="display:none"
                            on:change={handleCheck}
                            unchecked >
  <label for="collapsible" class="lbl-toggle">{label}</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <p>
				{#each menu as item}
					<label>
						<input type=checkbox bind:group={choices} name="choices" value={item}>
						{item}
					</label>
				{/each}
      </p>
    </div>
  </div>
</div>

<style>
.wrap-collabsible {
  margin-bottom: 1.2rem 0;
}


.lbl-toggle {
  display: block;

  font-size: 1.2rem;  
  text-align: left;
  padding: 0.25rem;
	
  cursor: pointer;

  border-radius: 7px;
  transition: all 0.25s ease-out;
}

.lbl-toggle:hover {
  color: #FF0000;
}

.lbl-toggle::before {
  content: ' ';
  display: inline-block;

  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: px solid currentColor;
  vertical-align: middle;
  margin-right: .7rem;
  transform: translateY(-2px);

  transition: transform .2s ease-out;
}

.toggle:checked + .lbl-toggle::before {
  transform: rotate(90deg) translateX(-3px);
}

.collapsible-content {
  max-height: 0px;
  overflow: hidden;
  transition: max-height .25s ease-in-out;
}

.toggle:checked + .lbl-toggle + .collapsible-content {
  max-height: 100vh;
}

.toggle:checked + .lbl-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.collapsible-content .content-inner {
  background: rgba(250, 224, 66, .2);
  border-bottom: 1px solid rgba(250, 224, 66, .45);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  padding: .5rem 1rem;
}
</style>5
