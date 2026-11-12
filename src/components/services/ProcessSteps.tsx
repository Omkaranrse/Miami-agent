import type { ProcessStep } from "@/data/services";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface ProcessStepsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: ProcessStep[];
  actionLabel?: string;
  actionHref?: string;
  background?: "ivory" | "white";
}

export function ProcessSteps({
  eyebrow = "The Process",
  title,
  description,
  steps,
  actionLabel,
  actionHref,
  background = "white",
}: ProcessStepsProps) {
  const isIvory = background === "ivory";

  return (
    <section
      className={`border-b border-sand py-20 md:py-28 ${
        isIvory ? "bg-ivory" : "bg-white"
      }`}
    >
      <PageContainer>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actionLabel={actionLabel}
          actionHref={actionHref}
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => (
            <Reveal
              key={item.step}
              delay={idx * 0.06}
              className={`border border-sand p-7 ${
                isIvory ? "bg-white" : "bg-ivory"
              }`}
            >
              <span className="font-sans text-2xl font-bold text-gold-dark">
                {item.step}
              </span>
              <h3 className="mt-4 font-sans text-xl font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-charcoal/80">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

