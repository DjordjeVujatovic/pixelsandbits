"use client";

import { useState } from "react";
import { OFFERS } from "@/lib/content";

/* Tab switcher. The incrementing key on the panes remounts them on every
   switch, restarting the blur-in stagger even when the same tab is
   clicked twice (the handoff's fade-a/fade-b retrigger trick). */
export default function OfferingsTabs(): JSX.Element {
  const [tab, setTab] = useState(0);
  const [seq, setSeq] = useState(0);
  const offer = OFFERS[tab];

  return (
    <>
      <div className="pb-services-head">
        {/* The shell command is a kicker; the heading beneath it carries
            the meaning on its own. */}
        <div>
          <div className="pb-kicker">$ ls ./services</div>
          <h2 className="pb-h-md pb-services-h">What we do</h2>
        </div>
      </div>
      {/* The switcher sits between the heading and the pane it controls,
          right-aligned. The old per-service outcomes grid was removed as
          redundant — its copy lives in the pane bodies now. */}
      <div className="pb-tabs-row">
        <div className="pb-tabs" role="tablist" aria-label="Services">
          {OFFERS.map((o, i) => (
            <button
              key={o.tab}
              type="button"
              role="tab"
              aria-selected={tab === i}
              className={`pb-tab${tab === i ? " pb-tab-on" : ""}`}
              onClick={() => {
                setTab(i);
                setSeq((s) => s + 1);
              }}
            >
              {o.tab}
            </button>
          ))}
        </div>
      </div>
      <div className="pb-ai">
        <div className="pb-pane" key={`a-${seq}`}>
          <div className="pb-pi pb-offer-kicker">{offer.kicker}</div>
          <h3 className="pb-pi pb-h-md pb-offer-title">{offer.title}</h3>
          <p className="pb-pi pb-offer-body">{offer.body}</p>
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
