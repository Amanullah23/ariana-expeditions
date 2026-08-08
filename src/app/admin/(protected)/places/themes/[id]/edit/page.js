import { notFound } from "next/navigation";
import { getThemeById } from "../../../actions";
import ThemeForm from "../../../ThemeForm";

export const dynamic = "force-dynamic";

export default async function EditThemePage({ params }) {
  const { id } = await params;
  let theme;
  try {
    theme = await getThemeById(id);
  } catch {
    return notFound();
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Theme</h1>
      <p className="text-charcoal text-sm mb-8">
        Editing &quot;{theme.title}&quot;
      </p>
      <ThemeForm initialData={theme} />
    </div>
  );
}
