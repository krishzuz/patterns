import { useEffect, useState } from "react";

export function Subscribebale<MessageType>() {
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

export const createHookManager = <T>(
  initialValue: T
): (() => [T, (val: T) => void]) => {
  const subscriberesCount = Subscribebale<T>();

  return () => {
    const [state, setState] = useState<T>(initialValue);
    useEffect(() => subscriberesCount.subscribe(setState), []);
    return [
      state,
      (value) => {
        subscriberesCount.publish(value);
      },
    ];
  };
};
