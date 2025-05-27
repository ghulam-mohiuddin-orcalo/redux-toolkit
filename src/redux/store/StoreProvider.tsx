"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { makeStore } from "@/redux/store/store";
import type { ReactNode } from "react";
import type { AppStore } from "@/redux/store/store";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (!storeRef.current) return;
    const unsubscribe = setupListeners(storeRef.current.dispatch);
    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};