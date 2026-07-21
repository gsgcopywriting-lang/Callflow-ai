import Hero from "@/components/home/Hero";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import ROICalculator from "@/components/home/ROICalculator";
import CTASection from "@/components/home/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingTable from "@/components/pricing/PricingTable";
import Button from "@/components/ui/Button";

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
            title="Simple plans that pay for themselves in one booked job."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14">
            <PricingTable />
          </div>
          <div className="mt-10 text-center">
            <Button href="/pricing" variant="secondary">
              See full plan comparison
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
