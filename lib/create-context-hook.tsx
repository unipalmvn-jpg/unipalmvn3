"use client";

import React, { createContext, useContext, ReactNode, ReactElement } from "react";

export default function createContextHook<T>(
  useValue: () => T
): [({ children }: { children: ReactNode }) => ReactElement, () => T] {
  const Context = createContext<T | undefined>(undefined);

  function Provider({ children }: { children: ReactNode }): ReactElement {
    const value = useValue();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContextHook(): T {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useContext must be used within a Provider");
    }
    return context;
  }

  return [Provider, useContextHook];
}