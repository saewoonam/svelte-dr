import { writable } from "svelte/store";

export const createChannelStore = (channelId) => {
  const { subscribe, set, update } = writable([]);

  const eventSource = new EventSource(
    `http://132.163.53.82:4000/${channelId}/listen`
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
