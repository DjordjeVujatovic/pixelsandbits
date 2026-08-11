import { ASK_QA } from "@/lib/content";

/* All five question-and-answer pairs render as static text — the one
   question every buyer scrolls for must not hide behind a click. The
   terminal treatment stays as chrome around content that is already in
   the DOM, so it survives JavaScript being off and screen readers read
   it once, in order. */
export default function AskPanel(): JSX.Element {
  return (
    <div className="pb-ask-shell pb-ask-static">
      <div className="pb-ask-bar">
        <span className="pb-ask-name">pixels&bits · ask-us</span>
        <span className="pb-spacer" />
        <span className="pb-ask-tokens">{ASK_QA.length} answers · grounded</span>
      </div>

      <div className="pb-ask-body">
        {ASK_QA.map((item) => (
          <div className="pb-ask-item" key={item.q}>
            <div className="pb-ask-prompt">
              <span className="pb-ask-gt" aria-hidden="true">
                &gt;
              </span>
              <h3 className="pb-ask-q">{item.q}</h3>
            </div>
            <div className="pb-ask-answer">
              <span className="pb-ask-diamond" aria-hidden="true">
                ◆
              </span>
              <p className="pb-ask-words">{item.a}</p>
            </div>
            <div className="pb-ask-cites">
              <span className="pb-ask-srcs">sources</span>
              {item.cites.map(([label, href]) => (
                <a className="pb-ask-cite" href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
