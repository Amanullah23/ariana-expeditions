import LicenseForm from "../../LicenseForm";

export const dynamic = "force-dynamic";

export default function NewLicensePage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add License</h1>
      <LicenseForm />
    </div>
  );
}
