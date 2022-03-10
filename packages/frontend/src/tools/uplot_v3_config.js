export let data_config = [
            [1546300800, 1546387200],    // x-values (timestamps)
            [        35,         71],    // y-values (series 1)
            [        90,         15],    // y-values (series 2)
            ];

export let opts_config = {
    title: "",
    width: 600,
    height: 400,
    cursor: {
        y: true,
        // points: {
        //     show: false,
        // },
        drag: {
            // setScale: false,
            x: true,
            y: true,
        },
        bind: {},
    },
    scales: {
        x: {
            time:true,
            auto: true,
        },
        y: {
            auto: true,
            // distr: (a,b)=>{console.log(a,b); return 3;},
            distr: 3,
            log: 10,
            // range: (self, min, max) => {console.log([min, max]); return [min, max]}
        }
    },
    series: [
        {
            label: "Time",
        },
        {
            spanGaps: true,
            // in-legend display
            label: "y1",
            stroke: "red",
            width: 1,
            dash: [10, 5],
        },
        {
            spanGaps: true,
            label: "y2",
            stroke: "blue",
            width: 1,
        }
    ],
}
    export const colors = ['lavender',
        'thistle',
        'plum',
        'violet',
        'orchid',
        'fuchsia',
        'magenta',
        'mediumorchid',
        'mediumpurple',
        'blueviolet',
        'darkviolet',
        'darkorchid',
        'darkmagenta',
        'purple',
        'indigo'
        ]
    const colors_blue = ["#E1F5F3", 
                                 "#B3E5FC",
                                 "#81D4FA",
                                 "#4FC3F7",
                                 "#29B6F6",
                                 "#03A9F4",
                                 "#039BE5",
                                 "#0288D1",
                                 "#0244BD",
                                 "#01579B"]
