<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
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
		vol = parseFloat(stats.avax.current.volumeBuy);
		price = parseFloat(stats.avax.current.tokenPriceStable);
		avaxPlotData = [
			(vol - parseFloat(stats.avax.history48hrs.volumeBuy)) * price,
			(vol - parseFloat(stats.avax.history24hrs.volumeBuy)) * price
		];

		vol = parseFloat(stats.bsc.current.volumeBuy);
		price = parseFloat(stats.bsc.current.tokenPriceStable);
		bscPlotData = [
			(vol - parseFloat(stats.bsc.history48hrs.volumeBuy)) * price,
			(vol - parseFloat(stats.bsc.history24hrs.volumeBuy)) * price
		];

		vol = parseFloat(stats.eth.current.volumeBuy);
		price = parseFloat(stats.eth.current.tokenPriceStable);
		ethPlotData = [
			(vol - parseFloat(stats.eth.history48hrs.volumeBuy)) * price,
			(vol - parseFloat(stats.eth.history24hrs.volumeBuy)) * price
		];

		vol = parseFloat(stats.ftm.current.volumeBuy);
		price = parseFloat(stats.ftm.current.tokenPriceStable);
		ftmPlotData = [
			(vol - parseFloat(stats.ftm.history48hrs.volumeBuy)) * price,
			(vol - parseFloat(stats.ftm.history24hrs.volumeBuy)) * price
		];

		vol = parseFloat(stats.poly.current.volumeBuy);
		price = parseFloat(stats.poly.current.tokenPriceStable);
		polyPlotData = [
			(vol - parseFloat(stats.poly.history48hrs.volumeBuy)) * price,
			(vol - parseFloat(stats.poly.history24hrs.volumeBuy)) * price
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

	onMount(() => {
		chart = new Chart(canvas, config);
	});
</script>

<div>
	<canvas bind:this={canvas} />
</div>
