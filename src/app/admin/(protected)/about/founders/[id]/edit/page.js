import { notFound } from "next/navigation";
import { getFounderById } from "../../../actions";
import FounderForm from "../../../FounderForm";

export const dynamic = "force-dynamic";

export default async function EditFounderPage({ params }) {
  const { id } = await params;
  let founder;
  try {
    founder = await getFounderById(id);
  } catch {
    return notFound();
  }
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Founder</h1>
      <FounderForm initialData={founder} />
    </div>
  );
}
