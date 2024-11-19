export function Subscribebale<MessageType>() {
  //   private subscribers: Set<(msg: MessageType) => void> = new Set();
  const subscribers = new Set<(msg: MessageType) => void>();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },

    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg));
    },

    subscriberesCount(): number {
      return subscribers.size;
    },
  };
}
