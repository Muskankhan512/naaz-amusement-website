import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for visiting and booking tickets at ${site.name} events.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms & Conditions"
      title="Terms & Conditions"
      updated="30 May 2026"
      intro={`Welcome to ${site.name}. By accessing our website, booking tickets, or entering the event premises, you agree to the following terms and conditions. Please read them carefully before your visit.`}
      sections={[
        {
          heading: "Event Admission",
          body: [
            "All visitors must hold a valid ticket for entry. Tickets are non-transferable and valid only for the date and category for which they are purchased.",
            "Management reserves the right to refuse entry or remove any guest behaving in a manner that endangers themselves, other guests, or event property.",
          ],
        },
        {
          heading: "Tickets & Bookings",
          body: [
            "Online and on-site ticket prices, ride availability, and event timings may change without prior notice, especially during peak seasons and public holidays.",
            "Children's pricing is based on height/age criteria displayed at the ticket counter. Proof of age may be requested.",
          ],
        },
        {
          heading: "Ride Safety & Restrictions",
          body: [
            "Certain rides carry height, age, weight, and health restrictions. Guests must follow all posted safety instructions and ride operator directions at all times.",
            "Guests who are pregnant, have heart conditions, or other medical concerns should avoid high-thrill rides for their own safety.",
          ],
        },
        {
          heading: "Personal Belongings",
          body: [
            `${site.name} is not responsible for any loss, theft, or damage to personal belongings during your visit. Please use the lockers provided for valuables.`,
          ],
        },
        {
          heading: "Conduct & Liability",
          body: [
            "Guests enter and use the event facilities at their own risk. Our events follow strict safety protocols, but visitors are expected to act responsibly.",
            "Outside food, alcohol, sharp objects, and hazardous materials are strictly prohibited inside the event grounds.",
          ],
        },
        {
          heading: "Contact Us",
          body: [
            `For any questions about these terms, contact us at ${site.email} or call ${site.phone}.`,
            `Address: ${site.address}.`,
          ],
        },
      ]}
    />
  );
}
