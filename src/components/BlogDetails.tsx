import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Fetcher for a single blog using the ID
const fetchBlogById = async (id: number) => {
  const response = await fetch(`http://localhost:3001/blogs/${id}`);
  if (!response.ok) throw new Error("Blog not found");
  return response.json();
};

export default function BlogDetails({ id }: { id: number }) {
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  if (isLoading) return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-6 w-1/4" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );

  if (error) return <div className="text-red-500">Error loading blog content.</div>;

  return (
    <article className="max-w-3xl mx-auto">
      <div className="flex gap-2 mb-6">
        {blog.category.map((cat: string) => (
          <Badge key={cat} variant="secondary" className="px-3 py-1">
            {cat}
          </Badge>
        ))}
      </div>
      
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
        {blog.title}
      </h1>
      
      <p className="text-slate-500 mb-8 border-b pb-4">
        Published on {blog.date}
      </p>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-slate-800 whitespace-pre-wrap">
          {blog.content}
        </p>
      </div>
    </article>
  );
}