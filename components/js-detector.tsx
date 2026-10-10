"use client";

import { useLayoutEffect } from "react";

/**
 * Marks the document as JS-capable by removing the static `no-js` class from
 * <html> during layout (before paint), so:
 *   - reveals only hide content when JS can reveal it (no-JS safe), and
 *   - hydration sees the exact same className the server rendered (no mismatch).
 */
export function JsDetector() {
  useLayoutEffect(() => {
    document.documentElement.classList.remove("no-js");
  }, []);

  return null;
}