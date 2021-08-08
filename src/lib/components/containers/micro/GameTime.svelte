<script lang='ts'>
import type { Timestamp } from "@firebase/firestore";

export let timestamp: Timestamp

</script>

<!-- {Intl.DateTimeFormat('en-US',{weekday:'long'}).format(timestamp.toDate().getDay())} -->
<p>{timestamp.toDate().toDateString()}</p>
<p>@ {timestamp.toDate().toLocaleTimeString([], { timeStyle: 'short' })}</p>


<style lang='scss'>

</style>