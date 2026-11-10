"use client";
import { createStore } from "@/lib/store";

const drawer = createStore(false);
export const useDrawerOpen = drawer.use;
export const setDrawer = drawer.set;
