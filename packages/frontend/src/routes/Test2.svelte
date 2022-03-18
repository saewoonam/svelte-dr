<svelte:head>
  <title>Test2 nodeWebFridge</title>
</svelte:head>
<div class="row">
    <div class="column side">
        <TempTable table_data={table_data} title={title} />
        <Config
              label={`click to choose plot items`} 
              menu={all_plot_keys}
              bind:choices={plot_keys} 
              on:close={handleConfigPlotClose}
              on:open={handleConfigPlotOpen}
        />
        <Config
              label={`choose table items`} 
              menu={all_table_keys}
              bind:choices={table_keys} 
              on:close={handleConfigTableClose}
              on:open={handleConfigTableOpen}
        />
        <Heater />
        <Timepicker />
    </div>
    <div class="column main">
        {#if loaded && !update}
            <Uplot data={plot_data} labels={plot_keys} />
        {:else}
            <Loader loading={!loaded || update} />
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
	import Config from '../components/MyCollapse.svelte'
    import Heater from '../components/checkbox_list_component.svelte';
    console.log(table_data_default);
    let table_data = table_data_default;
    table_data = {'stage1':'', 'stage2':''};
    let all_plot_data = null;
    let plot_data = null;
    let loaded = false;
    let update = false;
    let title = new Date().toLocaleString();
    let plot_keys; //  = ['stage1', 'stage2'];
    let table_keys; 
    let all_plot_keys;
    let all_table_keys;
    let hostname = 'localhost'

    function handleConfigPlotOpen(e) {
            console.log('handleConfigPlotOpen', e);
            update = true;
        }
    function handleConfigPlotClose(e) {
            console.log('handleConfigPlotClose', e);
            build_plot_data();
            update = false;
        }
    function handleConfigTableOpen(e) {
            console.log('handleConfigTableOpen', e);
        }
    function handleConfigTableClose(e) {
            console.log('handleConfigTableClose', e);
            table_data = {}
            table_keys.forEach(elt=>table_data[elt]='-1')
        }

    async function getRedis(list_name) { // Fetch all the sensor data from the server
        console.log(`get list ${list_name} from redis`);
        // let response = await fetch(`http://localhost:4000/get/${list_name}`)
        let response = await fetch(`http://${hostname}:4000/get/${list_name}`)
        let data = await response.json()
        console.log('got ', data);
        return data
    }
    function build_plot_data() {
            plot_data = [all_plot_data[0]];

            plot_keys.forEach( key => {
                    let idx = all_plot_keys.indexOf(key);
                    // console.log( 'index of', idx);
                    plot_data.push(all_plot_data[idx+1]);
                });
        }

    async function fetchRedis() { // Fetch all the sensor data from the server
        console.log('fetchRedis');
        all_plot_data = null;
        for (let key of all_plot_keys) {
            console.log('process redis data', key);
            // let response = await fetch(`http://localhost:4000/${key}/fetch`)
                let response = await fetch(`http://${hostname}:4000/${key}/fetch`)
            let data = await response.json()
            let times = data.data.map(outer=>Number(outer[0])/1000); //  convert from ms to s
            let readings = data.data.map(outer=>Number(outer[1]));
            /*
            let times=[];
            let readings=[];
            */
            if (all_plot_data) {
                // plot_data defined... need to merge in new data
                // console.log('merge into plot_data');
                all_plot_data.push(readings);
            } else {
                all_plot_data = [times, readings];
                // console.log('create plot_data');
                // console.log('times', times, readings);
            }
        }
        build_plot_data();
        loaded = true;
    }

    onMount(async() => {
            hostname = new URL(window.location.href).hostname
            console.log('hostname', hostname);
            all_plot_keys = await getRedis('plot_keys');
            plot_keys = [...all_plot_keys];
            plot_keys = ['CoolantIn', 'CoollantOut']
            console.log('onMount all_plot_keys', all_plot_keys, plot_keys);
            all_table_keys = await getRedis('table_keys');
            table_keys = [...all_table_keys];
            console.log('onMount table_keys', table_keys);
            table_data = {}
            table_keys = ['CoolantIn', 'CoollantOut']
            table_keys.forEach(elt=>table_data[elt]='-1')
            // console.log('got p_k', p_k);
            await fetchRedis();
            console.log('Finished onMounted');
    });
    $: console.log('plot_keys', plot_keys);
    $: console.log('loaded', loaded, 'plot_data', plot_data);
    $: {
                console.log('update', update);
        }
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
                all_plot_data[0].push(msg.time/1000); // push time into plot_data, convet to seconds
                all_plot_keys.forEach((key, idx)=> { // push sensor readings
                    all_plot_data[idx+1].push(msg[key])
                });
                build_plot_data();
                plot_data = plot_data; // this causes the plot to be updated
                // plot_keys = plot_keys;
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
