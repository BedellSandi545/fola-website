"use client";

import { useEffect } from "react";
import { MOTION_OK_QUERY } from "@/lib/motion";

const SELECTOR = "[data-animate]";

/**
 * Scroll reveals for every element marked [data-animate] (see globals.css › Reveal system).
 *
 * The CSS hides unrevealed elements only while <html> has `reveal-ready`. On mount,
 * anything already on screen is marked revealed first, then `reveal-ready` is added,
 * so above-the-fold content never flashes. Elements below the fold reveal once as they
 * enter. A MutationObserver picks up content added by client-side navigation.
 *
 * Without JavaScript, or with reduced motion, nothing is ever hidden.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK_QUERY).matches || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const seen = new WeakSet<Element>();
    // Browsers treat a fully clip-pathed element as not intersecting, so "mask" and
    // "draw" targets are watched through their parent (proxy -> targets).
    const targetsByProxy = new Map<Element, Element[]>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const target of targetsByProxy.get(entry.target) ?? []) target.classList.add("is-in");
          targetsByProxy.delete(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    const register = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.classList.contains("is-in")) return;
      const clipped = el.getAttribute("data-animate") === "mask" || el.getAttribute("data-animate") === "draw";
      const proxy = (clipped && el.parentElement) || el;
      const list = targetsByProxy.get(proxy);
      if (list) list.push(el);
      else targetsByProxy.set(proxy, [el]);
      io.observe(proxy);
    };

    // Reveal what is already visible before arming the hidden states.
    const viewport = window.innerHeight;
    document.querySelectorAll(SELECTOR).forEach((el) => {
      const rect = el.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < viewport && rect.width > 0;
      if (visible) el.classList.add("is-in");
      register(el);
    });
    root.classList.add("reveal-ready");

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) register(node);
          node.querySelectorAll(SELECTOR).forEach(register);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
