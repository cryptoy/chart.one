<script>
	import { onMount } from 'svelte';

	import { Chart, registerables } from 'chart.js/dist/chart.mjs';
	Chart.register(...registerables);
	import './tokenColors.js';
	import { avaxColor, bscColor, ethColor, ftmColor, polyColor } from './tokenColors.js';

	export let stats;
	let canvas;
	let chart;
	let avaxPlotData = [];
	let bscPlotData = [];
	let ethPlotData = [];
	let ftmPlotData = [];
	let polyPlotData = [];
	let unifiedValue;

	const updateChart = () => {
		avaxPlotData = [
			stats.avax.history14day.tokenPriceStable,
			stats.avax.history7day.tokenPriceStable,
			stats.avax.history48hrs.tokenPriceStable,
			stats.avax.history24hrs.tokenPriceStable,
			stats.avax.current.tokenPriceStable
		];
		bscPlotData = [
			stats.bsc.history14day.tokenPriceStable,
			stats.bsc.history7day.tokenPriceStable,
			stats.bsc.history48hrs.tokenPriceStable,
			stats.bsc.history24hrs.tokenPriceStable,
			stats.bsc.current.tokenPriceStable
		];
		ethPlotData = [
			stats.eth.history14day.tokenPriceStable,
			stats.eth.history7day.tokenPriceStable,
			stats.eth.history48hrs.tokenPriceStable,
			stats.eth.history24hrs.tokenPriceStable,
			stats.eth.current.tokenPriceStable
		];
		ftmPlotData = [
			stats.ftm.history14day.tokenPriceStable,
			stats.ftm.history7day.tokenPriceStable,
			stats.ftm.history48hrs.tokenPriceStable,
			stats.ftm.history24hrs.tokenPriceStable,
			stats.ftm.current.tokenPriceStable
		];
		polyPlotData = [
			stats.poly.history14day.tokenPriceStable,
			stats.poly.history7day.tokenPriceStable,
			stats.poly.history48hrs.tokenPriceStable,
			stats.poly.history24hrs.tokenPriceStable,
			stats.poly.current.tokenPriceStable
		];
	};

	$: if (stats && chart) {
		updateChart();
		// unifiedValue = parseFloat(stats.unified.current.stakesCount).toFixed(0);
		chart.data.datasets[0].data = avaxPlotData;
		chart.data.datasets[1].data = bscPlotData;
		chart.data.datasets[2].data = ethPlotData;
		chart.data.datasets[3].data = ftmPlotData;
		chart.data.datasets[4].data = polyPlotData;
		chart.update();
	}

	const labels = ['14 Days', '7 Days', '2 Days', '1 Day', 'Now'];

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'AVAX',
				data: avaxPlotData,
				fill: false,
				borderColor: avaxColor,
				tension: 0.1
			},
			{
				label: 'BSC',
				data: bscPlotData,
				fill: false,
				borderColor: bscColor,
				tension: 0.1
			},
			{
				label: 'ETH',
				data: ethPlotData,
				fill: false,
				borderColor: ethColor,
				tension: 0.1
			},
			{
				label: 'FTM',
				data: ftmPlotData,
				fill: false,
				borderColor: ftmColor,
				tension: 0.1
			},
			{
				label: 'POLY',
				data: polyPlotData,
				fill: false,
				borderColor: polyColor,
				tension: 0.1
			}
		]
	};

	const config = {
		type: 'line',
		data: data
	};
	// const config = {
	// 	type: 'doughnut',
	// 	data: data,
	// 	plugins: [
	// 		ChartDataLabels,
	// 		{
	// 			id: 'text',
	// 			beforeDraw: function (chart, a, b) {
	// 				var width = chart.width,
	// 					height = chart.height,
	// 					ctx = chart.ctx;

	// 				ctx.restore();
	// 				var fontSize = (height / 300).toFixed(2);
	// 				ctx.font = fontSize + 'em sans-serif';
	// 				ctx.textBaseline = 'middle';

	// 				var text = `Total: ${parseFloat(unifiedValue).toLocaleString('en-US')}`,
	// 					textX = Math.round((width - ctx.measureText(text).width) / 2),
	// 					textY = height / 2;

	// 				ctx.fillText(text, textX, textY);
	// 				ctx.save();
	// 			}
	// 		}
	// 	],
	// 	options: {
	// 		cutout: '50%',
	// 		borderWidth: 2,
	// 		borderColor: 'white',
	// 		layout: {
	// 			padding: 20
	// 		},
	// 		plugins: {
	// 			datalabels: {
	// 				formatter: function (value, context) {
	// 					const chain = context.chart.data.labels[context.dataIndex];
	// 					const displayText = `${parseFloat(value).toLocaleString('en-US')}`;
	// 					return displayText;
	// 				},
	// 				color: 'black',
	// 				labels: {
	// 					title: {
	// 						font: {
	// 							size: '14px'
	// 						},
	// 						color: 'black'
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// };

	onMount(() => {
		chart = new Chart(canvas, config);
	});
</script>

<div>
	<canvas bind:this={canvas} />
</div>
