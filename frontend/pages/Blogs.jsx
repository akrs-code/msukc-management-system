import { useEffect, useState, useMemo, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { X } from "lucide-react";
import Header from "../components/Header";

// Utility function for date formatting
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// Featured Post Component
const FeaturedPost = ({ post, onClick }) => (
  <article
    className="flex flex-col md:col-span-2 cursor-pointer"
    onClick={onClick}
  >
    {post?.image && (
      <img
        src={`http://localhost:8000${post.image}`}
        alt={post.title || "Blog post image"}
        className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-2xl shadow mb-4"
        loading="lazy"
      />
    )}
    <span className="text-xs sm:text-sm text-gray-500">
      {post?.author} • <time>{formatDate(post?.createdAt)}</time>
    </span>
    <h2 className="font-bold text-xl sm:text-2xl mt-2 mb-3 text-gray-900 font-cinzel">
      {post?.title}
    </h2>
    <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
      {post?.content}
    </p>
  </article>
);

// Blog Card Component
const BlogCard = ({ post, onClick }) => (
  <article
    className="relative flex flex-col rounded-2xl overflow-hidden shadow hover:shadow-xl transition bg-white cursor-pointer"
    onClick={onClick}
  >
    {post?.image && (
      <div className="relative w-full h-48 sm:h-56">
        <img
          src={`http://localhost:8000${post.image}`}
          alt={post.title || "Blog post image"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    )}
    <div className="flex flex-col p-5">
      <span className="text-sm text-gray-500 mb-1">
        {post?.author} • <time>{formatDate(post?.createdAt)}</time>
      </span>
      <h2 className="font-bold text-lg sm:text-xl mb-2 text-gray-900 font-cinzel">
        {post?.title}
      </h2>
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post?.content}</p>
      {post?.category && (
        <span className="self-start text-xs bg-[#BB2A1D] text-white px-3 py-1 rounded-full">
          {post.category}
        </span>
      )}
    </div>
  </article>
);

// Modal Component
const PostModal = ({ post, onClose }) => {
  // Close on ESC
  const handleKeyDown = useCallback(
    (e) => e.key === "Escape" && onClose(),
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        {post?.image && (
          <img
            src={`http://localhost:8000${post.image}`}
            alt={post.title}
            className="w-full h-64 object-cover mb-4 rounded-lg shadow"
          />
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#BB2A1D] mb-4 font-cinzel">
          {post?.title}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4 font-montserrat">
          {post?.content}
        </p>
        {post?.category && (
          <span className="text-sm text-gray-500 italic font-montserrat">
            {post.category}
          </span>
        )}
      </div>
    </div>
  );
};

const Blogs = () => {
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostContext();
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/post/show", {
          headers: user ? { Authorization: `Bearer ${user.token}` } : {},
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "GET_POST", payload: json });
        } else {
          setError(json.message || "Failed to fetch posts");
        }
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [user, dispatch]);

  const featuredPost = useMemo(() => posts[0], [posts]);
  const sidePosts = useMemo(() => posts.slice(1, 4), [posts]);
  const allPosts = useMemo(() => posts, [posts]);

  return (
    <>
      <Header />
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 font-montserrat max-w-7xl mx-auto">
        <h1 className="font-cinzel font-bold text-2xl sm:text-3xl md:text-4xl text-[#BB2A1D] mb-8 sm:mb-12">
          Recent blog posts
        </h1>

        {loading && <p className="text-gray-500">Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
            <FeaturedPost post={featuredPost} onClick={() => setSelectedPost(featuredPost)} />
            <div className="flex flex-col gap-4 sm:gap-6">
              {sidePosts.map((post) => (
                <BlogCard key={post._id} post={post} onClick={() => setSelectedPost(post)} />
              ))}
            </div>
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-gray-400">No posts available.</p>
        )}

        <h1 className="font-cinzel font-bold text-2xl sm:text-3xl md:text-4xl text-[#BB2A1D] mb-8 sm:mb-12">
          All blog posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <BlogCard key={post._id} post={post} onClick={() => setSelectedPost(post)} />
          ))}
        </div>

        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      </section>
    </>
  );
};

export default Blogs;
