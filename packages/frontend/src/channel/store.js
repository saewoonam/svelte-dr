import { writable } from "svelte/store";

export const createChannelStore = (channelId) => {
  const { subscribe, set, update } = writable([]);
  const hostname = (new URL(window.location.href)).hostname;
  console.log('store2 hostname:', hostname);
  const eventSource = new EventSource(
    `http://${hostname}:4000/${channelId}/listen`
  );

  eventSource.onmessage = (e) => {
    update((messages) => messages.concat(JSON.parse(e.data)));
  };

  return {
    subscribe,
    reset: () => set([]),
    close: eventSource.close,
  };
};
