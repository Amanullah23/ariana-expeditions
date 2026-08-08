import ThemeForm from "../../ThemeForm";

export const dynamic = "force-dynamic";

export default function NewThemePage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add Theme</h1>
      <p className="text-charcoal text-sm mb-8">
        Create a new browsing theme for the Sites page.
      </p>
      <ThemeForm />
    </div>
  );
}
