"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MOTION_OK_QUERY } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Web encodes of public/video/hero.MP4 (see docs/IMPLEMENTATION_PLAN.md › Hero video). */
const SOURCES = {
  small: "/video/hero-540.mp4",
  large: "/video/hero-720.mp4",
  poster: "/video/hero-poster.jpg",
} as const;

type NetworkInformation = { saveData?: boolean };

/**
 * The hero film: FCA's vertical first-year reel, shown whole at 9:16 so its
 * burned-in captions are never cropped, inside a frame that sits on an
 * "ambient" backdrop: a tiny canvas copy of the playing video, blurred to fill
 * the column with the film's own colours.
 *
 * Plays muted and looped when motion is allowed and the visitor has not asked to
 * save data; otherwise it waits on its poster for a play click. It pauses while
 * off screen. Turning sound on restarts the film so the message is heard from
 * the beginning. Play/pause and sound controls are always available.
 */
export function HeroVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const userPaused = useRef(false);
  const onScreen = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  // Autoplay (muted) only when it is welcome.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motionOk = window.matchMedia(MOTION_OK_QUERY).matches;
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true;
    if (motionOk && !saveData) {
      video.preload = "auto";
      video.play().catch(() => {
        /* Autoplay refused by the browser: the play button stays available. */
      });
    } else {
      userPaused.current = true;
    }
  }, []);

  // Pause while off screen; resume when back unless the visitor paused it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
        if (!entry.isIntersecting && !video.paused) video.pause();
        else if (entry.isIntersecting && video.paused && !userPaused.current) video.play().catch(() => {});
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  // Ambient backdrop: paint the current frame into a tiny canvas ~12 times a second.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!video || !canvas || !ctx) return;
    let raf = 0;
    let last = 0;
    const paint = (now: number) => {
      raf = requestAnimationFrame(paint);
      if (now - last < 80 || video.readyState < 2 || !onScreen.current) return;
      last = now;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      // First listen starts from the top so the message is heard in full.
      if (video.currentTime > 1) video.currentTime = 0;
      video.muted = false;
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      video.muted = true;
    }
  }, []);

  return (
    <div className={cn("relative isolate overflow-hidden bg-brand", className)}>
      {/* Ambient layer: poster first, then the live canvas once frames arrive. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center blur-3xl saturate-150"
          style={{ backgroundImage: `url(${SOURCES.poster})` }}
        />
        <canvas
          ref={canvasRef}
          width={36}
          height={64}
          className={cn(
            "absolute inset-0 size-full scale-125 blur-3xl saturate-150 transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/45 via-transparent to-brand/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(4_14_28/0.5)_100%)]" />
      </div>

      {/* Vertical label along the column edge (wide screens). */}
      <p
        aria-hidden="true"
        className="absolute top-1/2 left-6 hidden origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[0.7rem] font-semibold tracking-[0.32em] whitespace-nowrap text-white/70 uppercase xl:left-8 xl:block"
      >
        FCA <span className="mx-2 inline-block h-px w-8 bg-accent align-middle" /> Year one
      </p>

      <div className="flex h-full items-center justify-center px-6 py-10 sm:py-14 lg:px-10 lg:py-12">
        <figure
          data-hero-card
          className="relative aspect-[9/16] h-[min(76svh,40rem)] max-w-full overflow-hidden rounded-[1.75rem] bg-black shadow-[0_50px_100px_-30px_rgb(0_0_0/0.75)] ring-1 ring-white/15 outline outline-1 outline-offset-[10px] outline-white/15 lg:h-[min(86%,46rem)]"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            poster={SOURCES.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Fola Creative Agency: our first year. A short film with spoken narration and on-screen captions."
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            onLoadedData={() => setReady(true)}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (progressRef.current && v.duration) progressRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
            }}
          >
            <source src={SOURCES.small} type="video/mp4" media="(max-width: 767px)" />
            <source src={SOURCES.large} type="video/mp4" />
          </video>

          {/* Large play button while paused. */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play film"
            tabIndex={playing ? -1 : 0}
            aria-hidden={playing || undefined}
            className={cn(
              "absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-opacity duration-300",
              playing ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-accent text-on-accent shadow-xl transition-transform duration-300 hover:scale-105">
              <Play aria-hidden="true" className="ml-1 size-8 fill-current" />
            </span>
          </button>

          {/* Control bar. */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause film" : "Play film"}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors duration-200 hover:bg-white hover:text-black"
            >
              {playing ? <Pause aria-hidden="true" className="size-4 fill-current" /> : <Play aria-hidden="true" className="ml-0.5 size-4 fill-current" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-md transition-colors duration-200 hover:bg-white hover:text-black"
            >
              {muted ? <VolumeX aria-hidden="true" className="size-4" /> : <Volume2 aria-hidden="true" className="size-4" />}
              {muted ? "Sound on" : "Sound off"}
            </button>
          </div>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
            <span
              ref={progressRef}
              className="block h-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-linear"
            />
          </span>
        </figure>
      </div>
    </div>
  );
}
