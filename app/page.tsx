"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, type: "tween" },
  },
} satisfies Variants;

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, type: "tween" },
  },
} satisfies Variants;

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {/* Background */}
      <div className="bg-scene">
        <img src="/bg_upscaled.webp" alt="" className="bg-scene-img" />
        <div className="bg-scene-overlay" />
      </div>
      <div className="bg-noise" />
      <div className="bg-vignette" />

      {/* Logo — top left */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        src="/logo-transparent.png"
        alt="AmoBar"
        className="absolute top-6 left-6 z-20 h-20 md:h-28 lg:top-8 lg:left-10 lg:h-36 w-auto"
      />

      {/* Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <motion.div
          className="flex w-full max-w-lg flex-col items-center gap-10 text-center lg:max-w-6xl lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:text-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Left side — hero (desktop) / top section (mobile) */}
          <div className="flex flex-col items-center gap-8 lg:items-start lg:flex-1">

            {/* Badge */}
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-white/[0.07] bg-white/[0.03] px-5 py-1.5 text-[11px] font-medium tracking-[0.2em] text-amber-200/60 uppercase"
            >
              Coming Soon
            </motion.span>

            {/* Hero H1 */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-bold leading-[0.92] tracking-tighter text-white sm:text-6xl md:text-7xl"
            >
              {/* Mobile: two lines */}
              <span className="lg:hidden">
                One bar.
                <br />
                <span className="text-[#F6BD60]">One full meal.</span>
              </span>
              {/* Desktop: one line */}
              <span className="hidden lg:inline">
                One bar = <span className="text-[#F6BD60]">One full meal.</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-base leading-relaxed text-zinc-300 md:text-lg"
            >
              A healthy, convenient, on-the-go solution.
            </motion.p>

            {/* Value props — desktop only, below subtitle */}
            <motion.div
              variants={fadeIn}
              className="hidden lg:flex items-center gap-x-8 text-sm text-zinc-300/70"
            >
              <span>Balanced nutrition</span>
              <span className="text-zinc-400">&middot;</span>
              <span>Science-based</span>
              <span className="text-zinc-400">&middot;</span>
              <span>No prep needed</span>
            </motion.div>
          </div>

          {/* Right side — waitlist card (desktop) / below hero (mobile) */}
          <div className="flex w-full flex-col items-center gap-6 lg:flex-none lg:w-[420px]">
            {/* Waitlist card */}
            <motion.div
              variants={fadeUp}
              className="glass-card w-full rounded-2xl p-8 lg:p-10"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center gap-5 py-6"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-2xl text-emerald-400">
                      &#10003;
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-white">
                        You&apos;re on the list!
                      </p>
                      <p className="mt-2 text-sm text-zinc-300">
                        Keep an eye on your inbox.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <p className="text-sm font-medium text-zinc-200">
                      Be the first to meet the bar that makes busy days easier.
                    </p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="your@email.com"
                      className="input-dark w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-burgundy w-full rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
                    >
                      {status === "loading" ? "Joining..." : "Join the Waitlist"}
                    </button>
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-sm text-red-400/80"
                        >
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Value props — mobile only */}
            <motion.div
              variants={fadeIn}
              className="flex lg:hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-zinc-300/70"
            >
              <span>Balanced nutrition</span>
              <span className="hidden sm:inline text-zinc-400">&middot;</span>
              <span>Science-based</span>
              <span className="hidden sm:inline text-zinc-400">&middot;</span>
              <span>No prep needed</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 text-[11px] tracking-wider text-zinc-400"
        >
          &copy; 2026 AmoBar
        </motion.footer>
      </main>
    </>
  );
}
