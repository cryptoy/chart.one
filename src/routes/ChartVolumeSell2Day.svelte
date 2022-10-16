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

	const updateChart = () => {
		let vol = 0;
		let price = 0;
		vol = parseFloat(stats.avax.current.volumeSell);
		price = parseFloat(stats.avax.current.tokenPriceStable);
		avaxPlotData = [
			(vol - parseFloat(stats.avax.history48hrs.volumeSell)) * price,
			(vol - parseFloat(stats.avax.history24hrs.volumeSell)) * price
		];

		vol = parseFloat(stats.bsc.current.volumeSell);
		price = parseFloat(stats.bsc.current.tokenPriceStable);
		bscPlotData = [
			(vol - parseFloat(stats.bsc.history48hrs.volumeSell)) * price,
			(vol - parseFloat(stats.bsc.history24hrs.volumeSell)) * price
		];

		vol = parseFloat(stats.eth.current.volumeSell);
		price = parseFloat(stats.eth.current.tokenPriceStable);
		ethPlotData = [
			(vol - parseFloat(stats.eth.history48hrs.volumeSell)) * price,
			(vol - parseFloat(stats.eth.history24hrs.volumeSell)) * price
		];

		vol = parseFloat(stats.ftm.current.volumeSell);
		price = parseFloat(stats.ftm.current.tokenPriceStable);
		ftmPlotData = [
			(vol - parseFloat(stats.ftm.history48hrs.volumeSell)) * price,
			(vol - parseFloat(stats.ftm.history24hrs.volumeSell)) * price
		];

		vol = parseFloat(stats.poly.current.volumeSell);
		price = parseFloat(stats.poly.current.tokenPriceStable);
		polyPlotData = [
			(vol - parseFloat(stats.poly.history48hrs.volumeSell)) * price,
			(vol - parseFloat(stats.poly.history24hrs.volumeSell)) * price
		];
	};

	$: if (stats && chart) {
		updateChart();
		chart.data.datasets[0].data = avaxPlotData;
		chart.data.datasets[1].data = bscPlotData;
		chart.data.datasets[2].data = ethPlotData;
		chart.data.datasets[3].data = ftmPlotData;
		chart.data.datasets[4].data = polyPlotData;
		chart.update();
	}

	const labels = ['2 Days', '24 Hours'];

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'AVAX',
				data: avaxPlotData,
				backgroundColor: [avaxColor],
				borderColor: ['black'],
				borderWidth: 1
			},
			{
				label: 'BSC',
				data: bscPlotData,
				backgroundColor: [bscColor],
				borderColor: ['black'],
				borderWidth: 1
			},
			{
				label: 'ETH',
				data: ethPlotData,
				backgroundColor: [ethColor],
				borderColor: ['black'],
				borderWidth: 1
			},
			{
				label: 'FTM',
				data: ftmPlotData,
				backgroundColor: [ftmColor],
				borderColor: ['black'],
				borderWidth: 1
			},
			{
				label: 'POLY',
				data: polyPlotData,
				backgroundColor: [polyColor],
				borderColor: ['black'],
				borderWidth: 1
			}
		]
	};
	const config = {
		type: 'bar',
		data: data,
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
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
