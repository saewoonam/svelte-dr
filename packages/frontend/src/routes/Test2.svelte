<svelte:head>
  <title>Test2 nodeWebFridge</title>
</svelte:head>
<div class="row">
    <div class="column side">
        <TempTable table_data={table_data} title={title} />
        <CollapsibleSection headerText={"choose_items_for_plotting"} /> 
        <CollapsibleSection headerText={"choose_items_for_the_table"} /> 
        {#if loaded}
        <Timepicker />
        {/if}
    </div>
    <div class="column main">
        {#if loaded}
            <Uplot data={plot_data} labels={plot_keys} />
        {:else}
            <Loader loading={!loaded} />
        {/if}
    </div>

</div>


<script>
    import { redisSub } from "../channel/store2";
    import { onMount } from "svelte";
    import Timepicker from '../components/timepicker.svelte';
    import TempTable from '../components/temperature_table.svelte';
    import {table_data_default, controls_default, states_default} from '../tools/defaults.js';
    import Uplot from '../components/uplot_v3.svelte';
    import Loader from '../components/Loader.svelte';
	import CollapsibleSection from '../components/CollapsibleSection.svelte'
    
    console.log(table_data_default);
    let table_data = table_data_default;
    table_data = {'stage1':'', 'stage2':''};
    let plot_data = null;
    let loaded = false;
    let title = new Date().toLocaleString();
    let plot_keys; //  = ['stage1', 'stage2'];
    let table_keys; 
    let all_plot_keys;
    let all_table_keys;

    async function getRedis(list_name) { // Fetch all the sensor data from the server
        console.log(`get list ${list_name} from redis`);
        // let response = await fetch(`http://localhost:4000/get/${list_name}`)
        let response = await fetch(`http://132.163.53.82:4000/get/${list_name}`)
        let data = await response.json()
        console.log('got ', data);
        return data
    }

    async function fetchRedis() { // Fetch all the sensor data from the server
        console.log('fetchRedis');
        plot_data = null;
        // console.log('plot_keys', plot_keys);
        for (let key of plot_keys) {
            console.log('process redis data', key);
            // let response = await fetch(`http://localhost:4000/${key}/fetch`)
            let response = await fetch(`http://132.163.53.82:4000/${key}/fetch`)
            let data = await response.json()
            // console.log('data', key,  data.data);
            let times = data.data.map(outer=>Number(outer[0])/1000); //  convert from ms to s
            let readings = data.data.map(outer=>Number(outer[1]));
            if (plot_data) {
                // plot_data defined... need to merge in new data
                // console.log('merge into plot_data');
                plot_data.push(readings);
            } else {
                plot_data = [times, readings];
                // console.log('create plot_data');
                // console.log('times', times, readings);
            }
        }
        loaded = true;
    }

    onMount(async() => {
        all_plot_keys = await getRedis('plot_keys');
        plot_keys = [...all_plot_keys];
        console.log('onMount plot_keys', plot_keys);
        all_table_keys = await getRedis('table_keys');
        table_keys = [...all_table_keys];
        console.log('onMount plot_keys', table_keys);
        table_data = {}
        table_keys.forEach(elt=>table_data[elt]='')
        // console.log('got p_k', p_k);
        await fetchRedis();
        console.log('Finished onMounted');
    });

    $: console.log('loaded', loaded, 'plot_data', plot_data);
    $: {
        let msg = $redisSub.message;
        let ready_to_update = false;
        // console.log('got this redisSub message: ', msg);
        if (msg) {  // Check if it is a valid dictionary
            try {
                // Try to convert message to dictonary
                msg = JSON.parse(msg);
                ready_to_update = true;
            }
            catch(e) {console.log('parse redis failed msg:', msg);
            }
        }
        if (ready_to_update) {
            // Update table
            Object.keys(table_data).forEach(elt => {
                table_data[elt] = msg[elt];
            });

            // Update time
            title = new Date(msg.time).toLocaleString();
            // Update plot
            if (loaded) {
                console.log('got time:', msg.time);
                plot_data[0].push(msg.time/1000); // push time into plot_data, convet to seconds
                plot_keys.forEach((key, idx)=> { // push sensor readings
                    plot_data[idx+1].push(msg[key])
                });
                plot_data = plot_data // Uplot does not update without this...
            }
        }
    }
</script>
<style>
* {
  box-sizing: border-box;
}
.column {
  float: left;
  padding: 10px;
}

/* Left and right column */
.column.side {
  width: 25%;
}

/* Middle column */
.column.main {
  width: 70%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column.side, .column.main {
    width: 100%;
  }
}

button {
    font-size: 18px;
    margin: 10px;
    }

</style>
