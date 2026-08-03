"use client";

import {
  useEffect,
  useLayoutEffect,
  type DependencyList,
  type RefObject,
} from "react";
import gsap from "gsap";

type UseGsapOptions = {
  scope?: RefObject<Element | null>;
  dependencies?: DependencyList;
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useGSAP(
  callback: () => void | (() => void),
  options: UseGsapOptions = {}
) {
  const { scope, dependencies = [] } = options;

  useIsomorphicLayoutEffect(() => {
    let cleanup: (() => void) | undefined;
    const context = gsap.context(() => {
      const result = callback();
      if (typeof result === "function") cleanup = result;
    }, scope?.current ?? undefined);

    return () => {
      cleanup?.();
      context.revert();
    };
    // The caller controls reruns through the explicit dependencies option.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
