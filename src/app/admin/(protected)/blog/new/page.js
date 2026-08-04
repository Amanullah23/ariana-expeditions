import BlogForm from "../BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add New Article</h1>
      <p className="text-charcoal text-sm mb-8">
        Write a new travel guide article for the public site.
      </p>
      <BlogForm />
    </div>
  );
}
