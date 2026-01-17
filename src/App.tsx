import { useState } from "react";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import BlogForm from "./components/BlogForm"; // Import the form
import { Button } from "./components/ui/button";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Panel */}
      <div className="w-80 md:w-96 border-r h-full flex flex-col bg-slate-50/30">
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <span className="font-bold text-lg">MyBlog</span>
          <Button size="sm" onClick={() => { setIsCreating(true); setSelectedId(null); }}>
            + New Post
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <BlogList onSelectBlog={(id: number) => {
            setSelectedId(id);
            setIsCreating(false);
          }} />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 h-full overflow-y-auto p-12 bg-white">
        {isCreating ? (
          <BlogForm onSuccess={() => setIsCreating(false)} />
        ) : selectedId ? (
          <BlogDetails id={selectedId} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <p className="italic text-lg">Select a blog or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;