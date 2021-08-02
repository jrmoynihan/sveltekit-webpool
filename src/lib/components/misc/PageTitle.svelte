<script lang='ts'>
import { useDarkTheme } from "$scripts/store";


</script>

<h1 class={$useDarkTheme ? 'highlight':''}>
    <slot></slot>
</h1>

<style lang="scss">
h1{
    text-decoration: underline;
    padding: 2rem; 
}
.highlight{
    text-shadow: 0 0 10px var(--accent-color);  
}

</style>