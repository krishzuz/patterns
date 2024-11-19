import { useContext, useSyncExternalStore } from "react";
import { Store, StoreContext } from "../App";

function useStore<T>(selector: (store: Store) => T): [T] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );

  return [state];
}

export default function DisplayContainer({ name }: { name: "name" | "email" }) {
  const content = useStore((store) => store[name]);
  return (
    <div style={{ border: "1px solid red", padding: "10px" }}>
      {name}: {content}
    </div>
  );
}
