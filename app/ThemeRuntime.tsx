"use client";

import { useEffect } from "react";

export function ThemeRuntime() {
  useEffect(() => {
    const api = window.ChecktrailTheme;
    if (api) api.apply(api.read());
  }, []);
  return null;
}
