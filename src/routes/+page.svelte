<script>
	import { fade, scale } from 'svelte/transition';
	import ChartAvgMultiplier from './ChartAvgMultiplier.svelte';
	import ChartHolders from './ChartHolders.svelte';
	import ChartMarketCap from './ChartMarketCap.svelte';
	import ChartPrice2Day from './ChartPrice2Day.svelte';
	import ChartPrice14Day from './ChartPrice14Day.svelte';
	import ChartRewards from './ChartRewards.svelte';
	import ChartStakes from './ChartStakes.svelte';
	import ChartStakesCount from './ChartStakesCount.svelte';
	import ChartVolumeBuy2Day from './ChartVolumeBuy2Day.svelte';
	import ChartVolumeSell2Day from './ChartVolumeSell2Day.svelte';
	import ChartVolumeBuy14Day from './ChartVolumeBuy14Day.svelte';
	import ChartVolumeSell14Day from './ChartVolumeSell14Day.svelte';
	import ChartVolumeNet14Day from './ChartVolumeNet14Day.svelte';
	import ChartRewardsUSD from './ChartRewardsUSD.svelte';
	import ChartTotalUSDRewards from './ChartTotalUSDRewards.svelte';
	import ChartTotalRiseRewards from './ChartTotalRiseRewards.svelte';
	import ChartVolumeNet2Day from './ChartVolumeNet2Day.svelte';
	import PriceFooter from './PriceFooter.svelte';
	import Chart14DayBurn from './Chart14DayBurn.svelte';
	import Chart14DaySupplyChange from './Chart14DaySupplyChange.svelte';

	const REFRESH_INTERVAL = 15000;
	const STATS_URL = 'https://everrise.azurewebsites.net/stats';
	let stats;

	const getStats = async () => {
		let res = await fetch(STATS_URL);
		stats = await res.json();

		await new Promise((resolve) => {
			setTimeout(() => resolve(1), REFRESH_INTERVAL);
		});
		getStats();
	};
	getStats();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.2/css/bootstrap.min.css"
		integrity="sha512-CpIKUSyh9QX2+zSdfGP+eWLx23C8Dj9/XmHjZY2uDtfkdLGo0uY12jgcnkX9vXOgYajEKb/jiw67EYm+kBf+6g=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

{#if stats != null}
	<div class="container mt-3">
		<div class="row justify-content-lg-center">
			<div class="col-lg-8 mb-3" in:fade>
				<div class="fs-2 text-center border-bottom">14-Day $RISE Price</div>
				<ChartPrice14Day {stats} />
			</div>
		</div>

		<br />
		<div class="row justify-content-lg-center" in:fade>
			<div class="col-lg-8">
				<div class="fs-2 text-center border-bottom">2-Day $RISE Price</div>
				<ChartPrice2Day {stats} />
			</div>
		</div>

		<br />
		<div class="row justify-content-lg-center" in:fade>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">Market Cap</div>
				<ChartMarketCap {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">% Staked</div>
				<ChartStakes {stats} />
			</div>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">Avg. Stake Multiplier</div>
				<ChartAvgMultiplier {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">Holders</div>
				<ChartHolders {stats} />
			</div>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">Stake Count</div>
				<ChartStakesCount {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">14-Day Burn (RISE)</div>
				<Chart14DayBurn {stats} />
			</div>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">14-Day % Chg in Supply on Chain (1 = 1%)</div>
				<Chart14DaySupplyChange {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">14-Day Rewards (RISE)</div>
				<ChartRewards {stats} />
			</div>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">14-Day Rewards (USD)</div>
				<ChartRewardsUSD {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">14-Day Total Rewards (RISE)</div>
				<ChartTotalRiseRewards {stats} />
			</div>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">14-Day Total Rewards (USD)</div>
				<ChartTotalUSDRewards {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">14-Day Buy Volume (USD)</div>
				<ChartVolumeBuy14Day {stats} />
			</div>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">14-Day Sell Volume (USD)</div>
				<ChartVolumeSell14Day {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">2-Day Buy Volume (USD)</div>
				<ChartVolumeBuy2Day {stats} />
			</div>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">2-Day Sell Volume (USD)</div>
				<ChartVolumeSell2Day {stats} />
			</div>
		</div>

		<br />
		<div class="row mt-4" in:fade>
			<div class="col-lg-6 mb-3">
				<div class="fs-2 text-center border-bottom">14-Day Net Volume (USD)</div>
				<ChartVolumeNet14Day {stats} />
			</div>
			<div class="col-lg-6">
				<div class="fs-2 text-center border-bottom">2-Day Net Volume (USD)</div>
				<ChartVolumeNet2Day {stats} />
			</div>
		</div>
	</div>
	<br />
	<br />
	<br />

	<div in:fade>
		<PriceFooter {stats} />
	</div>
{:else}
	<div id="loading" class="d-flex justify-content-center align-items-center">
		<div class="fs-6" id="loading-wrapper">
			<div>
				<div class="d-flex justify-content-center flex-column align-items-center">
					<img
						id="chart-icon"
						src="favicon.png"
						width="32px"
						height="32px"
						alt="chart.one is loading"
					/>
					<br />
					<div id="loading-text">Loading...</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	#loading {
		position: absolute;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
	}

	#loading-text {
		animation: colors 1s linear infinite;
	}
	@keyframes colors {
		0% {
			transform: scale(1);
			border-radius: 100%;
		}

		50% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}
</style>
