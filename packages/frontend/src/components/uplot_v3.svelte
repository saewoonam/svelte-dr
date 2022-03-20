<script>
    import uPlot from 'uplot';
    import { onMount, afterUpdate } from 'svelte';
    import {data_config, opts_config, colors} from '../tools/uplot_v3_config.js'
    import {downloadBlob} from '../tools/download.js'
    import SvgIcon from '../components/SvgIcon.svelte'
    import LogIcon from '../components/LogIcon.svelte'
    import LinIcon from '../components/LinIcon.svelte'
    import {bellIcon, download, home, png} from '../components/AppIcons.js'
    import filesaver from 'file-saver';
    export let data = data_config;
    export let opts = opts_config;
    export let labels = ['y0', 'y1']
    export let size = {
            width: 600,
            height: 400,
        };

    let plotDiv;
    // let uPlot;
    let uplot;
    let html2canvas;
    let autox = true;
    let autoy = true;
    let logy = 3;
    // console.log(opts)
    let y_range;
    let x_range;

    opts = {...opts, ...size};
    opts.scales.x.auto = ()=> {return autox}
    opts.scales.y.auto = ()=> {return autoy}
    //console.log(opts.scales.y.range);
    opts.scales.x.range = (self, min, max) => {
        min = min==null ? min : parseFloat(min);
        max = max==null ? max : parseFloat(max);
        x_range = [min, max];
        // console.log('x', x_range);
        return x_range
    }
    opts.scales.y.range = (self, min, max) => {
        console.log('before', min, max);
        if (!autoy) {
            let max_calc=[];
            let min_calc=[];
            for (let i=1; i<data.length; i++) {
                max_calc.push(Math.max(...data[i]))
                min_calc.push(Math.min(...data[i]))
            }
            max = Math.max(...max_calc);
            min = Math.min(...min_calc);
            console.log(min,max);
            min = 0.1
            max = 3
            y_range = uPlot.rangeNum(min, max, 0.1, true);;
        } else {
            y_range = uPlot.rangeNum(0.1, 3, 0.1, true);;
        }
        console.log('y:', y_range)
        return y_range;
    }
    opts.scales.y.range = null;
    /*
    opts['plugins'] =  [ 
       legendAsTooltipPlugin(),
     ]
    */
    opts['plugins'] =  [ 
       wheelZoomPlugin(0.75),
     ]
    opts.cursor.bind.dblclick = (u, targ, handler) => {
        return e => {
            console.log('in dblclick')
            autox = true;
            autoy= true;
            handler(e)              
        } 
    }
    opts.cursor.bind.mousemove = (u, targ, handler) => {
        return e => {
            if (e.buttons==1) {
                autox = false;
                autoy = false;
                // console.log(e)
                // console.log('mousemove button', e.button, 'buttons', e.buttons);
            }
            handler(e)
        }
    }
    let s = [{}]
    for (let i=0; i<data.length-1; i++) {
        s.push({
            spanGaps: true,
            label: "y"+i,
            stroke: colors[9-i],
            width: 2
        })
    }
    opts.series = s;
    // console.log('opts.series', opts.series)
    // console.log('labels', labels);
    labels.forEach((item, index) => {
        opts.series[index+1].label = item; // offset index by 1, index 0: time
    });
    let mounted = false;
    onMount(async () => {
        /*
        const module = await import ('uplot');
        uPlot = module.default;
        console.log("uplot onMount")
        uplot = new uPlot(opts,data,plotDiv); 
        mounted = true;
        */
        uplot = uPlot(opts,data,plotDiv); 
        mounted = true;

        /*
        const m = await import ('html2canvas');
        html2canvas = m.default;
        console.log(html2canvas)
         */
    });
    /*
    $: {console.log('data changed into uPlot, data.length', data.length);}
    $: {console.log('labels changed into uPlot, label.length', labels.length);}
    */
    afterUpdate( ()=> {
        // console.log('afterUpdate data[0].length', data[0].length)
        if (mounted) {
                if(uplot && autox && autoy) {
                        uplot.setData(data);
                        // console.log('setData with auto');
                } else if (uplot) {
                        uplot.setData(data, false);
                        // console.log('setData with false');
                        // console.log('uplot', uplot.scales);
                        
                        let xMin = uplot.scales.x.min;
                        let xMax = uplot.scales.x.max;
                        let yMin = uplot.scales.y.min;
                        let yMax = uplot.scales.y.max;
                        // console.log(xMin, xMax, yMin, yMax);
                        uplot.setScale('x', {min:xMin, max:xMax});
                        uplot.setScale('y', {min:yMin, max:yMax});
                }
                uplot.setSize(size);
        }
    })
    function toggle_autox() {
        autox = !autox;
    }
    function toggle_autoy() {
        autoy = !autoy;
    }
    function resetAxis() {
        autox = true;
        autoy = true;
        uplot.setData(data)
    }
    function toggle_logy() {
        if (logy==3) {
            logy = 1;
        } else {
            logy = 3;
        }
        opts.scales.y.distr = logy;
        // Not sure which way is better...
        // plotDiv.innerHTML = '';
        plotDiv.removeChild(plotDiv.firstChild)
        // console.log('toggle_logy', data.length);
        uplot = new uPlot(opts,data,plotDiv); 

    }
    function saveCanvas()  {
        var canvas = document.querySelector(".u-wrap > canvas:nth-child(2)");
        console.log("canvas", canvas)
        canvas.toBlob(function(blob) {
            filesaver.saveAs(blob, "uplot.png");
        });
    }
    function saveCanvas2() {
            html2canvas(plotDiv).then(canvas => {
                    document.body.appendChild(canvas)
            });
    }
    function downloadData() {
        console.log("Download file");
        const filename = 'fridge.json';
        const blob = new Blob([JSON.stringify(data)], {type : 'application/json'});
        downloadBlob(blob, filename);
    }
function wheelZoomPlugin(opts) {
    let factor = opts.factor || 0.75;

    let xMin, xMax, yMin, yMax, xRange, yRange;

    function clamp(nRange, nMin, nMax, fRange, fMin, fMax) {
        if (nRange > fRange) {
            nMin = fMin;
            nMax = fMax;
        }
        else if (nMin < fMin) {
            nMin = fMin;
            nMax = fMin + nRange;
        }
        else if (nMax > fMax) {
            nMax = fMax;
            nMin = fMax - nRange;
        }
        // turn off autoscale when data added
        return [nMin, nMax];
    }

    return {
        hooks: {
            ready: u => {
                xMin = u.scales.x.min;
                xMax = u.scales.x.max;
                yMin = u.scales.y.min;
                yMax = u.scales.y.max;

                xRange = xMax - xMin;
                yRange = yMax - yMin;

                let over = u.over;
                let rect = over.getBoundingClientRect();

                // wheel drag pan
                over.addEventListener("mousedown", e => {
                    if (e.button == 1) {
                        //	plot.style.cursor = "move";
                        e.preventDefault();

                        let left0 = e.clientX;
                        let top0 = e.clientY;

                        let scXMin0 = u.scales.x.min;
                        let scXMax0 = u.scales.x.max;
                        // Remember y settings... somehow they get reset 
                        let scYMin0 = u.scales.y.min;
                        let scYMax0= u.scales.y.max;
                        

                        let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');
                        let yUnitsPerPx = u.posToVal(1, 'y') - u.posToVal(0, 'y');

                        function onmove(e) {
                            e.preventDefault();

                            autox = false;

                            let left1 = e.clientX;
                            let top1 = e.clientY;

                            let dx = xUnitsPerPx * (left1 - left0);
                            let dy = yUnitsPerPx * (top1 - top0);

                            u.setScale('x', {
                                    min: scXMin0 - dx,
                                    max: scXMax0 - dx,
                                });
                            // set y scale so that they are not null
                            u.setScale('y', {
                                    min: scYMin0 - dy,
                                    max: scYMax0 - dy,
                                });
                        }

                        function onup(e) {
                            document.removeEventListener("mousemove", onmove);
                            document.removeEventListener("mouseup", onup);
                        }

                        document.addEventListener("mousemove", onmove);
                        document.addEventListener("mouseup", onup);

                    }
                });

                // wheel scroll zoom
                over.addEventListener("wheel", e => {
                    e.preventDefault();

                    let {left, top} = u.cursor;

                    let leftPct = left/rect.width;
                    let btmPct = 1 - top/rect.height;
                    let xVal = u.posToVal(left, "x");
                    let yVal = u.posToVal(top, "y");
                    let oxRange = u.scales.x.max - u.scales.x.min;
                    let oyRange = u.scales.y.max - u.scales.y.min;

                    let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
                    let nxMin = xVal - leftPct * nxRange;
                    let nxMax = nxMin + nxRange;
                    [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

                    let nyRange = e.deltaY < 0 ? oyRange * factor : oyRange / factor;
                    let nyMin = yVal - btmPct * nyRange;
                    let nyMax = nyMin + nyRange;
                    [nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);
                    console.log('wheel', nxMin, nxMax, nyMin, nyMax);
                    u.batch(() => {
                    u.setScale("x", {
                            min: nxMin,
                            max: nxMax,
                        });

                    u.setScale("y", {
                            min: nyMin,
                            max: nyMax,
                        });
                    });
                    // autox = false;
                    // autoy = false;
                });
            }
        }
    };
}

    function legendAsTooltipPlugin({ className, style = { backgroundColor:"rgba(255, 249, 196, 0.92)", color: "black" } } = {}) {
        let legendEl;

        function init(u, opts) {
            legendEl = u.root.querySelector(".u-legend");

            legendEl.classList.remove("u-inline");
            className && legendEl.classList.add(className);

            // console.log(legendEl)
            

            uPlot.assign(legendEl.style, {
                textAlign: "left",
                pointerEvents: "none",
                display: "none",
                position: "absolute",
                left: 0,
                top: 0,
                // zIndex: 100,
                // boxShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                // ...style
            });
            // hide series color markers
            const idents = legendEl.querySelectorAll(".u-marker");

            for (let i = 0; i < idents.length; i++)
                idents[i].style.display = "none";

            const overEl = u.root.querySelector(".u-over");
            overEl.style.overflow = "visible";

            // move legend into plot bounds
            overEl.appendChild(legendEl);

            // show/hide tooltip on enter/exit
            overEl.addEventListener("mouseenter", () => {legendEl.style.display = null;});
            overEl.addEventListener("mouseleave", () => {legendEl.style.display = "none";});

            // let tooltip exit plot
            //  overEl.style.overflow = "visible";
        }

        function update(u) {
            const { left, top } = u.cursor;
            legendEl.style.transform = "translate(" + left + "px, " + top + "px)";
        }

        return {
            hooks: {
                init: init,
                setCursor: update,
            }
        };
    }


</script>
<style>
/* @import "https://leeoniya.github.io/uPlot/dist/uPlot.min.css"; */
button {
    font-size: 18px;
    }
</style>
    <link rel="stylesheet" href="https://leeoniya.github.io/uPlot/dist/uPlot.min.css">
    <div>
        <button on:click={resetAxis}>
            <SvgIcon d={home} />
        </button>
        <button on:click={toggle_logy}>
            {#if logy==3}
                <LinIcon />
            {:else}
                <LogIcon />
            {/if}
        </button>
        <button on:click={saveCanvas}>
            <SvgIcon d={png} />
        </button>
        <button on:click={downloadData}>
            <SvgIcon d={download} />
        </button>
    </div>
    <div bind:this={plotDiv}></div>


