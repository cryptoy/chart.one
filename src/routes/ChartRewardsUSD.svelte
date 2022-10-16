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
		let rewards = parseFloat(stats.avax.current.rewards);
		let price = parseFloat(stats.ftm.current.tokenPriceStable);
		avaxPlotData = [
			(rewards - parseFloat(stats.avax.history14day.rewards)) * price,
			(rewards - parseFloat(stats.avax.history7day.rewards)) * price,
			(rewards - parseFloat(stats.avax.history48hrs.rewards)) * price,
			(rewards - parseFloat(stats.avax.history24hrs.rewards)) * price
		];

		rewards = parseFloat(stats.bsc.current.rewards);
		price = parseFloat(stats.bsc.current.tokenPriceStable);
		bscPlotData = [
			(rewards - parseFloat(stats.bsc.history14day.rewards)) * price,
			(rewards - parseFloat(stats.bsc.history7day.rewards)) * price,
			(rewards - parseFloat(stats.bsc.history48hrs.rewards)) * price,
			(rewards - parseFloat(stats.bsc.history24hrs.rewards)) * price
		];

		rewards = parseFloat(stats.eth.current.rewards);
		price = parseFloat(stats.eth.current.tokenPriceStable);
		ethPlotData = [
			(rewards - parseFloat(stats.eth.history14day.rewards)) * price,
			(rewards - parseFloat(stats.eth.history7day.rewards)) * price,
			(rewards - parseFloat(stats.eth.history48hrs.rewards)) * price,
			(rewards - parseFloat(stats.eth.history24hrs.rewards)) * price
		];

		rewards = parseFloat(stats.ftm.current.rewards);
		price = parseFloat(stats.ftm.current.tokenPriceStable);
		ftmPlotData = [
			(rewards - parseFloat(stats.ftm.history14day.rewards)) * price,
			(rewards - parseFloat(stats.ftm.history7day.rewards)) * price,
			(rewards - parseFloat(stats.ftm.history48hrs.rewards)) * price,
			(rewards - parseFloat(stats.ftm.history24hrs.rewards)) * price
		];

		rewards = parseFloat(stats.poly.current.rewards);
		price = parseFloat(stats.poly.current.tokenPriceStable);
		polyPlotData = [
			(rewards - parseFloat(stats.poly.history14day.rewards)) * price,
			(rewards - parseFloat(stats.poly.history7day.rewards)) * price,
			(rewards - parseFloat(stats.poly.history48hrs.rewards)) * price,
			(rewards - parseFloat(stats.poly.history24hrs.rewards)) * price
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

	const labels = ['14 Days', '7 Days', '2 Days', '1 Day'];

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
		let bar_ctx = chart.getContext('2d');
		// var background_1 = bar_ctx.createLinearGradient(0, 0, 0, 600);
		// background_1.addColorStop(0, 'red');
		// background_1.addColorStop(1, 'blue');
	});
</script>

<div>
	<canvas bind:this={canvas} />
</div>
