"use client";

import { useEffect, useState } from "react";

export function useNonce() {
  const [nonce, setNonce] = useState<string | null>(null);

  useEffect(() => {
    try {
      const meta = document.querySelector('meta[name="csp-nonce"]') as HTMLMetaElement | null;
      if (meta && meta.content) {
        setNonce(meta.content);
      }
    } catch {
      // noop
    }
  }, []);

  return nonce;
}


