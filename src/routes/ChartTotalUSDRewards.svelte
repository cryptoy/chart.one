<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js/dist/chart.mjs';
	Chart.register(...registerables);
	import './tokenColors.js';
	import { avaxColor, bscColor, ethColor, ftmColor, polyColor } from './tokenColors.js';

	export let stats;
	let canvas;
	let chart;
	let rewardPlotData = [];

	const updateChart = () => {
		let rewards = parseFloat(stats.unified.current.rewards);
		let price = parseFloat(stats.unified.current.tokenPriceStable);
		rewardPlotData = [
			(rewards - parseFloat(stats.unified.history14day.rewards)) * price,
			(rewards - parseFloat(stats.unified.history7day.rewards)) * price,
			(rewards - parseFloat(stats.unified.history48hrs.rewards)) * price,
			(rewards - parseFloat(stats.unified.history24hrs.rewards)) * price
		];
	};

	$: if (stats && chart) {
		updateChart();
		chart.data.datasets[0].data = rewardPlotData;
		chart.update();
	}

	const labels = ['14 Days', '7 Days', '2 Days', '24 Hours'];

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Rewards',
				data: rewardPlotData,
				backgroundColor: ['#00FF7F'],
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
