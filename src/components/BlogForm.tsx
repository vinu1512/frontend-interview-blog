import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BlogForm({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
  });

  const mutation = useMutation({
    mutationFn: async (newBlog: any) => {
      const response = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newBlog,
          date: new Date().toLocaleDateString(),
          category: newBlog.category.split(",").map((s: string) => s.trim()),
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      // This "refreshes" the list automatically!
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <Input 
        placeholder="Blog Title" 
        required 
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      <Input 
        placeholder="Short Description" 
        required 
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <Input 
        placeholder="Categories (comma separated: AI, Tech)" 
        required 
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      />
      <Textarea 
        placeholder="Write your blog content here..." 
        className="h-40" 
        required 
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
      />
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting..." : "Post Blog"}
      </Button>
    </form>
  );
}