import Hero from "@/components/home/Hero";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import ROICalculator from "@/components/home/ROICalculator";
import CTASection from "@/components/home/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import ReceptionistPricingCard from "@/components/pricing/ReceptionistPricingCard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <ROICalculator />

      <section className="border-t border-border-subtle py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Pricing"
            title="One plan that pays for itself in one booked job."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14">
            <ReceptionistPricingCard variant="compact" />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
