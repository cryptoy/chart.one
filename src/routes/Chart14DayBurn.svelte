<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js/dist/chart.mjs';
	Chart.register(...registerables);
	import './tokenColors.js';
	import { avaxColor, bscColor, ethColor, ftmColor, polyColor } from './tokenColors.js';

	export let stats;
	let canvas;
	let chart;
	let burnPlotData = [];

	const updateChart = () => {
		let burn = parseFloat(stats.unified.current.burn);
		burnPlotData = [
			burn - parseFloat(stats.unified.history14day.burn),
			burn - parseFloat(stats.unified.history7day.burn),
			burn - parseFloat(stats.unified.history48hrs.burn),
			burn - parseFloat(stats.unified.history24hrs.burn)
		];
	};

	$: if (stats && chart) {
		updateChart();
		chart.data.datasets[0].data = burnPlotData;
		chart.update();
	}

	const labels = ['14 Days', '7 Days', '2 Days', '24 Hours'];

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Burn',
				data: burnPlotData,
				backgroundColor: ['#F54E16'],
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
