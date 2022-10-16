<script>
	export let stats;
	let avaxPrice, bscPrice, ethPrice, ftmPrice, polyPrice, rewards24Hrs;
	const setPrices = () => {
		avaxPrice = stats.avax.current.tokenPriceStable;
		bscPrice = stats.bsc.current.tokenPriceStable;
		ethPrice = stats.eth.current.tokenPriceStable;
		ftmPrice = stats.ftm.current.tokenPriceStable;
		polyPrice = stats.poly.current.tokenPriceStable;
		let rewards = parseFloat(stats.unified.current.rewards);
		let price = parseFloat(stats.unified.current.tokenPriceStable);
		rewards24Hrs = (
			(rewards - parseFloat(stats.unified.history24hrs.rewards)) *
			price
		).toLocaleString('US-en');
	};

	$: {
		stats = stats;
		setPrices();
	}
</script>

<div class="footer fixed-bottom bg-dark" id="bottom-box">
	<p class="text-light d-flex justify-content-around marquee">
		<span class="me-4">
			<img alt="AVAX" width="16px" height="16px" src="/icons/avalanche.svg" />
			${avaxPrice}
		</span>

		<span class="me-4">
			<img alt="BSC" width="16px" height="16px" src="/icons/smartchain.svg" />
			${bscPrice}
		</span>

		<span class="me-4">
			<img alt="ETH" width="16px" height="16px" src="/icons/ethereum.svg" />
			${ethPrice}
		</span>

		<span class="me-4">
			<img alt="FTM" width="16px" height="16px" src="/icons/fantom.svg" />
			${ftmPrice}
		</span>

		<span class="me-4">
			<img alt="POLY" width="16px" height="16px" src="/icons/polygon.svg" />
			${polyPrice}
		</span>
		<span>
			<span class="spring-green">24-Hour Rewards: </span>${rewards24Hrs}
		</span>
	</p>
</div>

<style>
	p {
		padding-top: 2px;
		padding-bottom: 2px;
		margin: 0 !important;
		padding-left: 0 !important;
		padding-right: 0 !important;
		white-space: nowrap;
	}

	.spring-green {
		color: springgreen;
	}

	@media (max-width: 600px) {
		.marquee {
			width: 125vw;
			animation: marquee-small 12s linear infinite;
		}
	}

	@media (max-width: 995px) and (min-width: 601px) {
		.marquee {
			width: 105vw;
			animation: marquee 16s linear infinite;
		}
	}

	@keyframes marquee-small {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(-125%);
		}
	}

	@keyframes marquee {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(-105%);
		}
	}
</style>
