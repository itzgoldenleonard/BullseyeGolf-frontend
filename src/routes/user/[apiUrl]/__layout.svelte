<header>
    <img src="" alt="back">
    <img src="" alt="logo">
    <img src="" alt="info">
</header>

<body>
    <slot></slot>
</body>

<style lang="scss">
	@import '../../../../static/_variables';
	@import '../../../../static/global.scss';

	body {
		@extend %body;
		width: auto;
		padding: $padding;
        overflow: hidden;
    }

    header {
        position: absolute;
        top: 0;
        left: 0;
        height: 48px;
        width: 100%;
        background-color: $foreground-color; 
        opacity: 0.9;
        z-index: 1;
    }
</style>