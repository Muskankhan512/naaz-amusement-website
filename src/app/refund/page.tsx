import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Ticket cancellation and refund policy for ${site.name} events.`,
};

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="Refund Policy"
      title="Refund & Cancellation Policy"
      updated="12 July 2026"
      intro="Naaz Amusement mein hum har booking ko importance dete hain. Kripya humari cancellation policy dhyan se padhein:"
      sections={[
        {
          heading: "Customer dwara cancellation",
          body: [
            "Ek baar ticket book ho jaane ke baad, humari koi refund policy nahi hai. Agar aap apni booking wali date par nahi aa paate, aap apni ticket ko reschedule kar sakte hain kisi aur available date ke liye — hamare helpdesk se contact karein.",
          ],
        },
        {
          heading: "Agar mela/event operator ki taraf se cancel ho",
          body: [
            "(Jaise mausam ya kisi anivarya karan se): Aapki ticket automatically agle mele/event ke liye valid rahegi, ya aap kisi upcoming location ke liye reschedule kar sakte hain.",
            "Is situation mein bhi cash refund nahi diya jayega, sirf reschedule ka option milega.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Kisi bhi sawaal ke liye humein WhatsApp ya email par contact karein.",
          ],
        },
      ]}
    />
  );
}
