import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | Ariana Expeditions",
  description:
    "Booking terms, deposit and payment policy, cancellation policy, and privacy policy for Ariana Expeditions.",
};

export default function Terms() {
  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-16 px-6 text-center">
        <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Your Explorers, Our Commitment
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            Booking Your Journey
          </h2>
          <p className="text-charcoal leading-relaxed mb-3">
            <strong className="text-dark">1. Secure Your Spot</strong> — To
            reserve your place, simply complete our Booking Form. It&apos;s the
            first step toward your Afghan journey.
          </p>
          <p className="text-charcoal leading-relaxed mb-3">
            <strong className="text-dark">2. Deposit &amp; Payment</strong> — A
            deposit of 200 USD is required to confirm your booking. The
            remaining balance is to be paid in cash on the first day of your
            tour. We accept new, crisp 100 USD bills (blue series) or 100 Euro
            banknotes.
          </p>
          <p className="text-charcoal leading-relaxed">
            <strong className="text-dark">3. Confirmation</strong> — Once your
            deposit is received, we&apos;ll send you a confirmation email to
            finalize your booking.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            Cancellation Policy
          </h2>
          <p className="text-charcoal leading-relaxed mb-3">
            <strong className="text-dark">By Ariana Expeditions:</strong> If we
            must cancel your tour before departure due to unforeseen
            circumstances, civil unrest, or political instability, your deposit
            will be converted into a credit for a future tour. If cancellation
            occurs during the tour, we&apos;ll refund the cost of the remaining
            days.
          </p>
          <p className="text-charcoal leading-relaxed">
            <strong className="text-dark">By You:</strong> If you cancel your
            tour before or during the trip, we regret that no refund can be
            issued.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            Code of Conduct
          </h2>
          <p className="text-charcoal leading-relaxed">
            We reserve the right to end your tour without refund if your actions
            violate our policies or endanger yourself or others.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            Force Majeure
          </h2>
          <p className="text-charcoal leading-relaxed">
            Ariana Expeditions cannot be held liable for losses, damages, or
            expenses caused by events beyond our control (e.g., natural
            disasters, political upheaval).
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            Privacy Policy
          </h2>
          <p className="text-charcoal leading-relaxed">
            Your personal information is sacred to us. We will never share it
            with third parties.
          </p>
        </div>

        <div className="border-t border-dark/10 pt-8">
          <h2 className="font-heading text-2xl text-dark mb-3">
            Your Declaration
          </h2>
          <p className="text-charcoal leading-relaxed">
            By booking with Ariana Expeditions, you confirm that you have read,
            understood, and accepted these Terms &amp; Conditions. You&apos;re
            ready to explore Afghanistan with an open heart and a spirit of
            journey.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
