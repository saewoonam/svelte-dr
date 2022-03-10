<script>
    // import Flatpickr from 'svelte-flatpickr'
    import Flatpickr from '../components/Flatpickr.svelte';
    export let date = new Date()
    export let disabled = false;

const flatpickrOptions = {
  enableTime: true,
    minDate: "today",
  onChange: (selectedDates, dateStr, instance) => {}
};

</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<div>
    Next Auto Recycle Time
    <Flatpickr bind:value={date} options={flatpickrOptions} {disabled}
      style='width:85%; font-size: 15px;' />
</div>
