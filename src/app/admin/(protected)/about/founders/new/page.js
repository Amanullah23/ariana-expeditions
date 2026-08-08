import FounderForm from "../../FounderForm";

export const dynamic = "force-dynamic";

export default function NewFounderPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add Founder</h1>
      <FounderForm />
    </div>
  );
}
