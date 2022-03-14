<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import Channel from "./routes/Channel.svelte";
  import Test from "./routes/Test.svelte";
  import Test2 from "./routes/Test2.svelte";

  const routes = {
    "/home": Home,
    "/channel/:id": Channel,
    "/test": Test,
    "/": Test2,
    "/test2": Test2,
  };
</script>

<Router {routes} />
