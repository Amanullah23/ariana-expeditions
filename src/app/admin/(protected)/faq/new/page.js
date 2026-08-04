import FaqForm from "../FaqForm";

export const dynamic = "force-dynamic";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add Question</h1>
      <p className="text-charcoal text-sm mb-8">
        Add a new frequently asked question to the public FAQ page.
      </p>
      <FaqForm />
    </div>
  );
}
