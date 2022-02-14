<div class="animation"><center>Todo</center><center><p>Akash</p></center></div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
	.animation {
		padding: 30px;
		background: 50% 100% / 50% 50% no-repeat
			radial-gradient(ellipse at bottom, #fff, transparent, transparent);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		font-size: 10vw;
		font-family: 'Source Sans Pro', sans-serif;
		animation: reveal 3000ms ease-in-out forwards 200ms, glow 2500ms linear infinite 2000ms;

		@keyframes reveal {
			80% {
				letter-spacing: 8px;
			}
			100% {
				background-size: 300% 300%;
			}
		}
		@keyframes glow {
			40% {
				text-shadow: 0 0 8px #fff;
			}
		}
	}
	p {
		padding-top: 0;
		font-size: 15px;
	}
</style>
