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
		let supply = parseFloat(stats.avax.current.supplyOnChainPercent);
		avaxPlotData = [
			(supply - parseFloat(stats.avax.history14day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.avax.history7day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.avax.history48hrs.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.avax.history24hrs.supplyOnChainPercent)) * 100
		];

		supply = parseFloat(stats.bsc.current.supplyOnChainPercent);
		bscPlotData = [
			(supply - parseFloat(stats.bsc.history14day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.bsc.history7day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.bsc.history48hrs.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.bsc.history24hrs.supplyOnChainPercent)) * 100
		];

		supply = parseFloat(stats.eth.current.supplyOnChainPercent);
		ethPlotData = [
			(supply - parseFloat(stats.eth.history14day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.eth.history7day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.eth.history48hrs.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.eth.history24hrs.supplyOnChainPercent)) * 100
		];

		supply = parseFloat(stats.ftm.current.supplyOnChainPercent);
		ftmPlotData = [
			(supply - parseFloat(stats.ftm.history14day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.ftm.history7day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.ftm.history48hrs.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.ftm.history24hrs.supplyOnChainPercent)) * 100
		];

		supply = parseFloat(stats.poly.current.supplyOnChainPercent);
		polyPlotData = [
			(supply - parseFloat(stats.poly.history14day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.poly.history7day.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.poly.history48hrs.supplyOnChainPercent)) * 100,
			(supply - parseFloat(stats.poly.history24hrs.supplyOnChainPercent)) * 100
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

	const labels = ['14 Days', '7 Days', '2 Days', '24 Hours'];

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
