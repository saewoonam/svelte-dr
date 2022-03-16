import { writable } from "svelte/store";

// export const createChannelStore2 = (channelId) => {
function createStore2() {
  const { subscribe, set, update } = writable([]);
  const channelId = 'test2';
  const eventSource = new EventSource(
    `http://132.163.53.82:4000/${channelId}/listen`
  );

  eventSource.onmessage = (e) => {
    console.log('createStore2 event.data', e.data);
    let msg = JSON.parse(e.data);
    if (Array.isArray(msg)) {
        console.log('convert from array')
        msg = msg[0];
    }
    update(() => msg);
  };

  return {
    subscribe,
    reset: () => set([]),
    close: eventSource.close,
  };
};

export const redisSub=createStore2();
