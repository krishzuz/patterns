import { useContext, useSyncExternalStore } from "react";
import { Store, StoreContext } from "../App";

function useStore<T>(
  selector: (store: Store) => T
): [T, (value: Partial<Store>) => void] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );

  return [state, store.set];
}

export default function FormContainer() {
  return (
    <div
      style={{ border: "1px solid red", padding: "10px", marginBottom: "10px" }}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <InputComponent name="name" />
        <InputComponent name="email" />
      </form>
    </div>
  );
}

const InputComponent = ({ name }: { name: "name" | "email" }) => {
  const [store, setStore] = useStore((store) => store[name]);
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        value={store}
        onChange={(e) => setStore({ [name]: e.target.value })}
        type="text"
        id={name}
        name={name}
      />
    </div>
  );
};
