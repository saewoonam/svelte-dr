<script>
    // import { redisSub } from "../channel/store2";
    let redisSub = {'message': 'not store'};
    console.log('redisSub', redisSub);
    import { onMount, beforeUpdate, afterUpdate } from "svelte";
    onMount(async () => {
        console.log('Test.svelte onMount');
        let response = await fetch('http://localhost:3000/stage1/fetch')
        console.log('response', await response.json())
    });
    // $:console.log('auto subscription', $redisSub.message);
</script>

<div>
    Test tweak
</div>
    <!--
{#if $redisSub}
<div>
        {$redisSub.message}
</div>
{/if}
-->
