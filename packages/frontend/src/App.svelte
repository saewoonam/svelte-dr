<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import Channel from "./routes/Channel.svelte";
  import Test from "./routes/Test.svelte";

  const routes = {
    "/": Home,
    "/channel/:id": Channel,
    "/test": Test
  };
</script>

<Router {routes} />
