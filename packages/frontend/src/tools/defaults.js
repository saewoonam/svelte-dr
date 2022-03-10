export let table_data_default = {
    '1k': -1,
    '4k':   3.070931,
    '40k': -1,
    'pump': 6.659844,
    'switch':   17.41950,
    'hp':   0.000000,
    'hs':   4.000000,
    'relays':   0,
}
export let controls_default = [
        { value: false, text: 'Pump on' },
        { value: false, text: 'Switch on' },
        { value: false, text: 'Compressor' },
        //{ value: false, test: 'Enable heaters'}
    ];

export let states_default = [
        {id: 1, text: 'manual'},
        {id: 2, text: 'unknown'},
        {id: 3, text: 'warming to 300K'},
        {id: 4, text: 'cooling to 4K'},
        {id: 5, text: 'Warm pump'},
        {id: 6, text: 'Keep pump hot'},
        {id: 7, text: 'Cool pump'},
    ];

