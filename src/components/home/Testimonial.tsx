import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/content";

/* The second quote sits immediately above the closing CTA — the last
   voice a visitor hears before the ask is a client's. The ZeroDown quote
   lives beside its proof in the Also-shipped list; the old two-quote
   carousel is gone (one visible quote beats two rotating ones). */
export default function Testimonial(): JSX.Element {
  const quote = TESTIMONIALS[1];
  return (
    <Reveal as="section" variant="rev" id="testimonials" className="pb-carsec">
      <div className="pb-kicker pb-quote-kicker">$ cat ./testimonials</div>
      <h2 className="pb-h-md pb-quote-h">What clients say afterwards</h2>

      <figure className="car">
        <span className="car-mark" aria-hidden="true">
          &rdquo;
        </span>
        <blockquote className="car-q">{quote.text}</blockquote>
        <figcaption className="car-cap">
          <span>
            <span className="car-name">{quote.name}</span>
            <span className="car-role">{quote.role}</span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
