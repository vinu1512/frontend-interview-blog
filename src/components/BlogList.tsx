import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input"; // Import the Input component

const fetchBlogs = async () => {
  const response = await fetch("http://localhost:3001/blogs");
  if (!response.ok) throw new Error("Server error");
  return response.json();
};

export default function BlogList({ onSelectBlog }: { onSelectBlog: (id: number) => void }) {
  const [search, setSearch] = useState(""); // State for search text
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // Filter blogs based on search input
  const filteredBlogs = blogs?.filter((blog: any) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="p-4 space-y-4"><Skeleton className="h-24 w-full" /></div>;
  if (error) return <div className="p-4 text-red-500">Error loading blogs</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-0 bg-slate-50/30 pb-4 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4">Blog Feed</h2>
        <Input 
          placeholder="Search blogs..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white"
        />
      </div>

      <div className="space-y-4">
        {filteredBlogs?.map((blog: any) => (
          <Card 
            key={blog.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectBlog(blog.id)}
          >
            <CardHeader className="p-4">
              <div className="flex gap-2 mb-2">
                {blog.category.map((cat: string) => (
                  <Badge key={cat} variant="secondary" className="text-[10px]">{cat}</Badge>
                ))}
              </div>
              <CardTitle className="text-md font-semibold">{blog.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-xs">{blog.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}