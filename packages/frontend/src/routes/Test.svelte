<script>
    import { onMount, beforeUpdate, afterUpdate } from "svelte";
    import { createChannelStore2 } from "../channel/store2";
    let messages;
    let response;
    onMount(async () => {
        console.log('Test.svelte onMount');
        const store = createChannelStore2('test2');

        store.subscribe(incomingMessages => {
          messages = incomingMessages;
          if (Array.isArray(messages)) {
                messages = messages[0];
            }
        });
        response = await fetch('http://localhost:3000/stage1/fetch')
        console.log('response', await response.json())
        return store.close;

    });
    $:console.log('messages', messages);

</script>

<div>
    Test tweak
</div>
{#if messages}
<div>
    {messages.message}
</div>
{/if}
