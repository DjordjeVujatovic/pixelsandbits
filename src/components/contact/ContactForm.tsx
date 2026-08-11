"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  AVAILABILITY,
  CONTACT_BUDGETS,
  CONTACT_KINDS,
  CONTACT_LOG,
  CONTACT_TIMELINES,
} from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Stage = "form" | "sending" | "done" | "error";

export default function ContactForm(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [brief, setBrief] = useState("");
  const [kinds, setKinds] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [stage, setStage] = useState<Stage>("form");
  const [logN, setLogN] = useState(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(Date.now());
  const timer = useRef(0);

  const filled = [name, email, company, brief, kinds.length ? "x" : "", budget, timeline].filter(
    Boolean,
  ).length;
  const pct = Math.round((filled / 7) * 100);
  const emailOk = EMAIL_RE.test(email.trim());
  const emailBad = email.trim().length > 2 && !emailOk;
  const ready = Boolean(name.trim() && emailOk && brief.trim().length > 12);
  const firstName = useMemo(() => name.trim().split(" ")[0] || "there", [name]);

  const toggleKind = (k: string) => {
    setKinds((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const submit = async () => {
    // Same guard as the disabled state, so a keyboard submit can't bypass it.
    if (!ready || stage === "sending") return;
    setStage("sending");
    setLogN(0);

    const post = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        kinds,
        budget,
        timeline,
        brief,
        website: honeypotRef.current?.value ?? "",
        fillMs: Date.now() - mountedAt.current,
      }),
    })
      .then((r) => r.ok)
      .catch(() => false);

    const finish = async () => {
      const ok = await post;
      if (ok) {
        setLogN(CONTACT_LOG.length);
        setStage("done");
      } else {
        setLogN(CONTACT_LOG.length - 1);
        setStage("error");
      }
    };

    if (prefersReducedMotion()) {
      await finish();
      return;
    }

    // Stream the first three log lines, then let the POST decide the last.
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      if (n < CONTACT_LOG.length) {
        setLogN(n);
      } else {
        window.clearInterval(timer.current);
        void finish();
      }
    }, 620);
  };

  const reset = () => {
    window.clearInterval(timer.current);
    setName("");
    setEmail("");
    setCompany("");
    setBrief("");
    setKinds([]);
    setBudget("");
    setTimeline("");
    setStage("form");
    setLogN(0);
  };

  const recap = [company || null, budget || null, timeline || null, ...kinds].filter(
    (x): x is string => Boolean(x),
  );

  return (
    <div className="ct-in ct-form-shell">
      <div className="ct-form-bar">
        <span className="pb-dot" />
        <span className="pb-dot" />
        <span className="pb-dot" />
        <span className="ct-form-name">new-project.form</span>
        <span className="pb-spacer" />
        <span className="ct-form-count">{filled}/7 fields</span>
      </div>

      <div className="ct-progress">
        <span className="ct-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {stage === "form" ? (
        <form
          className="ct-form-body"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <input
            className="ct-honeypot"
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="ct-two">
            <div>
              <label className="ct-label" htmlFor="ct-name">
                01 · your name <span className="ct-req">required</span>
                <span className="ct-tick">{name.trim() ? "✓" : ""}</span>
              </label>
              <input
                className="ct-field"
                id="ct-name"
                type="text"
                placeholder="jane doe"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="ct-label" htmlFor="ct-email">
                02 · email <span className="ct-req">required</span>
                <span className="ct-tick">{emailOk ? "✓" : ""}</span>
              </label>
              <input
                className={`ct-field${emailBad ? " ct-bad" : ""}`}
                id="ct-email"
                type="email"
                placeholder="jane@company.com"
                autoComplete="email"
                value={email}
                aria-invalid={emailBad}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="ct-err">{emailBad ? "that address does not look right" : ""}</span>
            </div>
          </div>

          <div>
            <label className="ct-label" htmlFor="ct-co">
              03 · company<span className="ct-tick">{company.trim() ? "✓" : ""}</span>
            </label>
            <input
              className="ct-field"
              id="ct-co"
              type="text"
              placeholder="company or product name"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <span className="ct-label">
              04 · what do you need? <span className="ct-label-dim">(pick any)</span>
              <span className="ct-tick">{kinds.length ? "✓" : ""}</span>
            </span>
            <div className="ct-chips">
              {CONTACT_KINDS.map((k) => (
                <button
                  className="ct-chip"
                  type="button"
                  key={k}
                  data-on={kinds.includes(k) ? "1" : "0"}
                  aria-pressed={kinds.includes(k)}
                  onClick={() => toggleKind(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="ct-two ct-two-wide">
            <div>
              <span className="ct-label">
                05 · budget<span className="ct-tick">{budget ? "✓" : ""}</span>
              </span>
              <div className="ct-chips ct-chips-tight">
                {CONTACT_BUDGETS.map((b) => (
                  <button
                    className="ct-chip"
                    type="button"
                    key={b}
                    data-on={budget === b ? "1" : "0"}
                    aria-pressed={budget === b}
                    onClick={() => setBudget(budget === b ? "" : b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="ct-label">
                06 · timeline<span className="ct-tick">{timeline ? "✓" : ""}</span>
              </span>
              <div className="ct-chips ct-chips-tight">
                {CONTACT_TIMELINES.map((t) => (
                  <button
                    className="ct-chip"
                    type="button"
                    key={t}
                    data-on={timeline === t ? "1" : "0"}
                    aria-pressed={timeline === t}
                    onClick={() => setTimeline(timeline === t ? "" : t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="ct-label" htmlFor="ct-brief">
              07 · what are you building? <span className="ct-req">required</span>
              <span className="ct-tick">{brief.trim().length > 12 ? "✓" : ""}</span>
            </label>
            <textarea
              className="ct-field"
              id="ct-brief"
              placeholder="the problem, who it's for, and where you are today"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </div>

          <div className="ct-submit-row">
            <button className="ct-btn ct-send" type="submit" disabled={!ready}>
              ship it →
            </button>
            <span className="ct-hint">
              {ready ? "ready to send" : "name, a valid email and a sentence or two are enough"}
            </span>
          </div>
        </form>
      ) : (
        <div className="ct-sent">
          <div className="ct-log">
            {CONTACT_LOG.slice(0, logN).map(([mark, text]) => (
              <span className="ct-log-line" key={text}>
                <span className="ct-log-mark">{mark}</span> {text}
              </span>
            ))}
            {stage === "error" ? (
              <span className="ct-log-line ct-log-err">
                <span className="ct-log-mark">✗</span> that didn&apos;t go through — nothing was
                lost
              </span>
            ) : null}
          </div>

          {stage === "error" ? (
            <div className="ct-confirm-btns">
              <button className="ct-btn ct-ghost-btn" type="button" onClick={() => void submit()}>
                try again →
              </button>
              <button
                className="ct-btn ct-ghost-btn ct-ghost-dim"
                type="button"
                onClick={() => setStage("form")}
              >
                back to the form
              </button>
            </div>
          ) : null}

          {stage === "done" ? (
            <div className="ct-confirm">
              <h2>Got it, {firstName}.</h2>
              <p>
                We read every one of these ourselves. Expect a reply within two
                business days — and if we&apos;re not the right fit, we&apos;ll
                say so and point you somewhere better.
              </p>
              <div className="ct-recap">
                {/* Same string as the hero ribbon, so the two can never
                    contradict each other. */}
                <span className="ct-tag">{AVAILABILITY}</span>
                {recap.map((r) => (
                  <span className="ct-tag" key={r}>
                    {r}
                  </span>
                ))}
              </div>
              <div className="ct-confirm-btns">
                <Link className="ct-btn ct-ghost-btn" href="/#work">
                  see the work
                </Link>
                <button
                  className="ct-btn ct-ghost-btn ct-ghost-dim"
                  type="button"
                  onClick={reset}
                >
                  send another
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
