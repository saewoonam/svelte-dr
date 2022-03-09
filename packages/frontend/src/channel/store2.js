import { writable } from "svelte/store";

export const createChannelStore2 = (channelId) => {
  const { subscribe, set, update } = writable([]);

  const eventSource = new EventSource(
    `http://localhost:3000/${channelId}/listen`
  );

  eventSource.onmessage = (e) => {
    console.log('event.data', e.data);
    update((messages) => JSON.parse(e.data));
  };

  return {
    subscribe,
    reset: () => set([]),
    close: eventSource.close,
  };
};
