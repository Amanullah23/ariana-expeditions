import { notFound } from "next/navigation";
import { getFaqItemById } from "../../actions";
import FaqForm from "../../FaqForm";

export default async function EditFaqPage({ params }) {
  const { id } = await params;

  let item;
  try {
    item = await getFaqItemById(id);
  } catch {
    return notFound();
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Question</h1>
      <p className="text-charcoal text-sm mb-8">
        Editing &quot;{item.question}&quot;
      </p>
      <FaqForm initialData={item} />
    </div>
  );
}
