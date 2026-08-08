import { notFound } from "next/navigation";
import { getLicenseById } from "../../../actions";
import LicenseForm from "../../../LicenseForm";

export const dynamic = "force-dynamic";

export default async function EditLicensePage({ params }) {
  const { id } = await params;
  let license;
  try {
    license = await getLicenseById(id);
  } catch {
    return notFound();
  }
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit License</h1>
      <LicenseForm initialData={license} />
    </div>
  );
}
