<svelte:head>
  <title>nodeWebFridge</title>
</svelte:head>
<script>
    import io from "socket.io-client";
    import Checkboxes from '../components/checkbox_list_component.svelte';
    import TempTable from '../components/temperature_table.svelte';
    import Timepicker from '../components/timepicker.svelte';
    import Uplot from '../components/uplot_v3.svelte';
    import Loader from '../components/Loader.svelte';
    import {table_data_default, controls_default, states_default} from '../tools/defaults.js';
    import {onMount} from 'svelte';
    let table_data = table_data_default;
    let states = states_default;
    let selected=3;
    let controls = controls_default;
    let manual_mode;
    let mounted = 0;
    let title = new Date().toLocaleString();
    let plot_data = []
    let got_message = false;
    let hide_advanced = true;
    let auto_recycle = true;
    let plot_keys = [];
    let table_keys = [];
    let plot_ready = false;
    let got_plot_data = false;
    let got_plot_keys = false;
    // plot_keys = ['Time', '1k', '4k', '40k', 'pump', 'switch']
    // make sure plot_data is the right size
    plot_keys.forEach(item=> plot_data.push([]));
    // load data from database
    onMount(async () => {
      console.log('mounted index');
      const res = await fetch('plot.json')
      const data = await res.json()
      plot_data = data;
      console.log('loaded plot_data[0].length', plot_data[0].length);
      got_plot_data = true
    })
    const socket = io();
    socket.on("message", function(message) {
        console.log("Got message:", message);
    });

    socket.on("plot_keys", function (keys) {
        // console.log("got plot_keys: ", keys);
        plot_keys = keys;
        got_plot_keys = true;
    });

    socket.on("table_keys", function (keys) {
        console.log("got table_keys: ", keys);
        table_keys = keys;
        // got_table_keys = true;
        let temp = {}
        table_keys.forEach(item=>temp[item]=-1)
        table_data = temp;
    });

    socket.on("button", function(message) {
        console.log("Got button message:", message);
        controls = message[0]
        got_message = true;
    });
    socket.on("mode", function(message) {
        console.log("Got mode message:", message);
        selected = message
    });
    socket.on("temp_data", function(temperatures) {
        // Update plot
        // console.log('temp_data', temperatures);
        let temp = [];
        plot_keys.forEach( (key) => {
          temp.push(temperatures[key])
        });
        title = new Date(temp[0]*1000).toLocaleString();
        // console.log(temp);
        for (let i=0; i<plot_data.length; i++) {
            plot_data[i].push(temp[i]);
        }
        plot_data = plot_data; // need this to update svelte arrays...
        // Update table
        /*
        for (const key in table_data) {
          table_data_default[key] = temperatures[key];
        }
         */
        table_keys.forEach(key => table_data[key] = temperatures[key]);
        table_data = table_data;
    });

    $: {
        if (mounted>1) {
            if (!got_message) {
                socket.emit("button", [controls]);
            } else {
                got_message = false;
            }
        }
        if (!got_message) mounted++;
    }
    $:{if (manual_mode) {
        selected=1
    }}
    function set_manual(value) {
        manual_mode = value;
    }
    $:{
        if (selected>2) {
            set_manual(false);
            console.log('selected is greater than 2', selected)
        } else {
            set_manual(true);
        }
        socket.emit("mode", selected);
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
<div class="row">
    <div class="column side">

        <TempTable table_data={table_data} title={title} />
        <div hidden={hide_advanced}>
            <select bind:value={selected}>
                {#each states as state}
                    <option value={state.id}>
                        {state.text}
                    </option>
                {/each}
            </select>
            <Checkboxes bind:controls={controls} bind:manual_mode={manual_mode}/>
        </div>
        <div hidden = {!hide_advanced}>
            Fridge State:<br> {states[selected].text}
        </div>
        <label>
            <input type=checkbox bind:checked={auto_recycle} >
                &nbsp&nbsp Auto recycle
            </label>
        <Timepicker disabled={!auto_recycle}/>
        <div>
            <button> Recycle Now </button>
        </div>

</div>
    <div class="column main">
        <Loader loading={!got_plot_data || !got_plot_keys} />
        {#if got_plot_data && got_plot_keys}
            <Uplot data={plot_data} labels={plot_keys}/>
        {/if}
    </div>
</div>
