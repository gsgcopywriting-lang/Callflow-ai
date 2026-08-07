import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import StatusChip from "@/components/ui/StatusChip";
import ReceptionistDemo from "@/components/demo/ReceptionistDemo";

export const metadata: Metadata = {
  title: "AI Receptionist Demo",
  description:
    "Talk to Ava, CallFlow AI's live AI receptionist demo. Switch industries, ask real questions, and try both chat and voice.",
};

export default function DemoPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <StatusChip label="live demo — not a recording" />
        <SectionHeading
          className="mt-6"
          eyebrow="Try it yourself"
          title="Talk to Ava."
          description="Pick an industry, then chat or talk to the AI receptionist exactly like a real customer would. Every response is generated live."
        />

        <div className="mt-10">
          <ReceptionistDemo />
        </div>
      </div>
    </section>
  );
}
