"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { OFFERS, PIPELINE_STEPS, SCHEDULE } from "@/lib/content";

const COUNT = PIPELINE_STEPS.length;

/* Services switcher: a full-width four-step stepper over the pane it
   controls. The lime bar fills up to and including the active phase,
   so the tabs read as the spine (Scoping → Design → Build → Handover).
   The incrementing key on the panes remounts them on every switch,
   restarting the blur-in stagger even when the same tab is clicked
   twice (the handoff's fade-a/fade-b retrigger trick). The next button
   counts as a switch too. */
export default function OfferingsTabs(): JSX.Element {
  const [tab, setTab] = useState(0);
  const [seq, setSeq] = useState(0);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const offer = OFFERS[tab];
  const phase = SCHEDULE[tab];
  const next = (tab + 1) % COUNT;
  const nextName = PIPELINE_STEPS[next];
  const wraps = next === 0;

  const select = (i: number) => {
    setTab(i);
    setSeq((s) => s + 1);
  };

  /* Roving tabindex: only the active step is in the tab order; arrows,
     Home and End move between steps and select as they go. */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let to: number | null = null;
    if (e.key === "ArrowRight") to = (tab + 1) % COUNT;
    else if (e.key === "ArrowLeft") to = (tab - 1 + COUNT) % COUNT;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = COUNT - 1;
    if (to === null) return;
    e.preventDefault();
    select(to);
    stepRefs.current[to]?.focus();
  };

  return (
    <>
      {/* The shell command is a kicker; the heading beneath it carries
          the meaning on its own. */}
      <div className="pb-kicker">$ ls ./services</div>
      <h2 className="pb-services-h">From scoping to handover</h2>

      <div
        className="pb-step-row"
        role="tablist"
        aria-label="Services"
        onKeyDown={onKeyDown}
      >
        {PIPELINE_STEPS.map((name, i) => (
          <button
            key={name}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`pb-step-${i}`}
            aria-selected={tab === i}
            aria-controls="pb-services-pane"
            tabIndex={tab === i ? 0 : -1}
            className={`pb-step${i <= tab ? " is-done" : ""}`}
            onClick={() => select(i)}
          >
            <span className="pb-step-bar" aria-hidden="true" />
            <span className="pb-step-head">
              <span className="pb-step-n">{SCHEDULE[i].num}</span>
              <span className="pb-step-name">{name}</span>
            </span>
            <span className="pb-step-sub">{SCHEDULE[i].steps.join(" · ")}</span>
          </button>
        ))}
      </div>
      {/* Phone only: the sub-line is hidden in the stepper, so the
          active phase's steps are repeated here on one line. */}
      <div className="pb-step-cur">
        {phase.num}/0{COUNT} · {phase.steps.join(" · ")}
      </div>

      <div
        className="pb-ai"
        id="pb-services-pane"
        role="tabpanel"
        aria-labelledby={`pb-step-${tab}`}
      >
        <div className="pb-pane-l">
          <div className="pb-pane" key={`a-${seq}`}>
            <div className="pb-pi pb-offer-kicker">{offer.kicker}</div>
            <h3 className="pb-pi pb-offer-title">{offer.title}</h3>
            <p className="pb-pi pb-offer-body">{offer.body}</p>
          </div>
          {/* Pinned to the bottom of the column. The button lives
              outside the remounted pane so focus survives a click. */}
          <div className="pb-deliv">
            <div className="pb-pane" key={`d-${seq}`}>
              <div className="pb-pi pb-deliv-k">YOU LEAVE WITH</div>
              <div className="pb-pi pb-deliv-v">{phase.deliverable.text}</div>
            </div>
            <button
              type="button"
              className="pb-next"
              aria-label={
                wraps
                  ? `Back to first phase: ${nextName}`
                  : `Next phase: ${nextName}`
              }
              onClick={() => select(next)}
            >
              {wraps
                ? `← back to ${nextName.toLowerCase()}`
                : `next: ${nextName.toLowerCase()} →`}
            </button>
          </div>
        </div>
        <div className="pb-pane pb-offer-points" key={`b-${seq}`}>
          {offer.points.map(([n, title, body]) => (
            <div className="pb-pi pb-point" key={n}>
              <span className="pb-point-n">{n}</span>
              <div>
                <div className="pb-point-title">{title}</div>
                <p className="pb-point-body">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
