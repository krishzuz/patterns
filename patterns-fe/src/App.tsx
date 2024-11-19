// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

// import { create } from "zustand";
import { createContext, useCallback, useRef, useState } from "react";
// import { createHookManager } from "./StateManager";
import AppContainer from "./Components/AppContainer";

// const useCounter = create<{
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// }>((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
// }));

// const Counter = createHookManager(0);

// const Header = memo(function Header() {
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//     </>
//   );
// });

// function Card() {
//   const [count, increment] = Counter();
//   // const count = useCounter((state) => state.count);
//   // const increment = useCounter((state) => state.increment);
//   return (
//     <>
//       <div className="card">
//         <button onClick={() => increment(count + 1)}>count is {count}</button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//     </>
//   );
// }

export type Store = {
  name: string;
  email: string;
};

function useStoredData(): {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (cb: (value: Store) => void) => () => void;
} {
  const store = useRef({
    name: "John Doe",
    email: "n5Nt8@example.com",
  });
  const subscribers = useRef(new Set<(value: Store) => void>());

  const get = useCallback(() => store.current, []);
  const set = useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((cb) => cb(store.current));
  }, []);

  const subscribe = useCallback((cb: (value: Store) => void) => {
    subscribers.current.add(cb);
    return () => subscribers.current.delete(cb);
  }, []);
  console.log(subscribers.current.size);
  return {
    get,
    set,
    subscribe,
  };
}

type useStoreDataReturnType = ReturnType<typeof useStoredData>;

export const StoreContext = createContext<useStoreDataReturnType | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const store = useStoredData();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
function App() {
  return (
    <>
      <Provider>
        <AppContainer />
      </Provider>
    </>
  );
}

export default App;
