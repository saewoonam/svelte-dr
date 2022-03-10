<!--
<svelte:head>
  <title>nodeWebFridge</title>
</svelte:head>
-->
<div class="row">
    <div class="column side">
        <TempTable table_data={table_data} title={title} />
        <Timepicker />
    </div>
    <div class="column main">
        <Uplot />
    </div>

</div>


<script>
    import { onMount } from "svelte";
    import Timepicker from '../components/timepicker.svelte';
    import TempTable from '../components/temperature_table.svelte';
    import {table_data_default, controls_default, states_default} from '../tools/defaults.js';
    import Uplot from '../components/uplot_v3.svelte';
    
    console.log(table_data_default);
    let table_data = table_data_default;
    let title = new Date().toLocaleString();
    onMount(async() => {
        let response = await fetch('http://localhost:3000/stage1/fetch')
        console.log('response', await response.json())
    });
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
