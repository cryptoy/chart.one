<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import './tokenColors.js';
	import { avaxColor, bscColor, ethColor, ftmColor, polyColor } from './tokenColors.js';

	export let stats;
	let canvas;
	let chart;
	let plotData = [];
	let unifiedValue;

	const updateChart = () => {
		plotData = [];
		['avax', 'bsc', 'eth', 'ftm', 'poly'].forEach((chain) => {
			const stakesCount = parseFloat(stats[chain].current.holders).toFixed(0);
			plotData.push(stakesCount);
		});
	};

	$: if (stats && chart) {
		updateChart();
		unifiedValue = parseFloat(stats.unified.current.holders).toFixed(0);
		chart.data.datasets[0].data = plotData;
		chart.update();
	}

	const data = {
		labels: ['AVAX', 'BSC', 'ETH', 'FTM', 'POLY'],
		datasets: [
			{
				label: 'Staking',
				data: plotData,
				backgroundColor: [avaxColor, bscColor, ethColor, ftmColor, polyColor],
				hoverOffset: 20
			}
		]
	};

	const config = {
		type: 'doughnut',
		data: data,
		plugins: [
			ChartDataLabels,
			{
				id: 'text',
				beforeDraw: function (chart, a, b) {
					var width = chart.width,
						height = chart.height,
						ctx = chart.ctx;

					ctx.restore();
					var fontSize = (height / 300).toFixed(2);
					ctx.font = fontSize + 'em sans-serif';
					ctx.textBaseline = 'middle';

					var text = `Total: ${parseFloat(unifiedValue).toLocaleString('en-US')}`,
						textX = Math.round((width - ctx.measureText(text).width) / 2),
						textY = height / 2;

					ctx.fillText(text, textX, textY);
					ctx.save();
				}
			}
		],
		options: {
			cutout: '50%',
			borderWidth: 2,
			borderColor: 'white',
			layout: {
				padding: 20
			},
			plugins: {
				datalabels: {
					formatter: function (value, context) {
						const chain = context.chart.data.labels[context.dataIndex];
						const displayText = `${parseFloat(value).toLocaleString('en-US')}`;
						return displayText;
					},
					color: 'black',
					labels: {
						title: {
							font: {
								size: '14px'
							},
							color: 'black'
						}
					}
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
