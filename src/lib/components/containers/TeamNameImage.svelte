<script lang='ts'>
import { dev } from "$app/env";
import type { Team } from "$scripts/classes/team";

export let team : Team = null

</script>

<picture>
    <!-- <source srcset={team.logoPath} type="image/webp" /> -->
    <img
        class="logo"
        src={dev ? `../../../static/${team.fontPath}`: team.fontPath }
        alt="{team.city}-{team.name}"
        width="200rem"
        height="auto"
        loading="lazy"
    />
</picture>

<style lang='scss'>
    	picture {
		@include accelerate;
		@include frostedGlass;
		box-shadow: none;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}
	img {
		@include accelerate;
		padding: 0 1rem;
	}

</style>