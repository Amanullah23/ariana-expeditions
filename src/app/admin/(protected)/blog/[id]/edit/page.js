import { notFound } from "next/navigation";
import { getBlogPostById } from "../../actions";
import BlogForm from "../../BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;

  let post;
  try {
    post = await getBlogPostById(id);
  } catch {
    return notFound();
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Article</h1>
      <p className="text-charcoal text-sm mb-8">
        Editing &quot;{post.title}&quot;
      </p>
      <BlogForm initialData={post} />
    </div>
  );
}
