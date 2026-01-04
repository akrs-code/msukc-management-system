import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { Heart, Eye, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const PostSection = () => {
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostContext();

  const [likes, setLikes] = useState({});
  const [views, setViews] = useState({});
  const [hasLiked, setHasLiked] = useState({});
  const [hasViewed, setHasViewed] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: "GET_POST", payload: [] });

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/post/show`, {
          headers: user ? { Authorization: `Bearer ${user.token}` } : {},
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "GET_POST", payload: json });

          const initialLikes = {};
          const initialViews = {};
          const initialHasLiked = {};
          const initialHasViewed = {};

          json.forEach((post) => {
            initialLikes[post._id] = post.likes || 0;
            initialViews[post._id] = post.views || 0;
            initialHasLiked[post._id] = post.hasLiked || false;
            initialHasViewed[post._id] = post.hasViewed || false;
          });

          setLikes(initialLikes);
          setViews(initialViews);
          setHasLiked(initialHasLiked);
          setHasViewed(initialHasViewed);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, dispatch]);

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`${API_URL}/api/post/${postId}/like`, {
        method: "POST",
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
      });

      if (res.ok) {
        const data = await res.json();
        setLikes((prev) => ({ ...prev, [postId]: data.likes }));
        setHasLiked((prev) => ({ ...prev, [postId]: data.hasLiked }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = async (postId) => {
    if (hasViewed[postId]) return;
    try {
      const res = await fetch(`${API_URL}/api/post/${postId}/view`, {
        method: "POST",
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
      });

      if (res.ok) {
        setViews((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
        setHasViewed((prev) => ({ ...prev, [postId]: true }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    posts.forEach((post) => handleView(post._id));
  }, [posts]);

  // 🔒 Lock scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedPost]);

  return (
    <section className="relative flex flex-col justify-center items-center pt-20 pb-20 px-6 lg:px-20">
      <h1 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-5xl leading-tight text-[#BB2A1D] mb-16 text-center relative z-10">
        LATEST POSTS
      </h1>

      {/* Loading state */}
      {loading ? (
        <p className="text-gray-400 text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400 text-center">No posts available.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {posts.map((post) => (
            <SwiperSlide key={post._id}>
              <article className="flex flex-col p-6 rounded-2xl bg-white w-[90%] max-w-sm md:max-w-md lg:max-w-md mx-auto font-montserrat h-full shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 ease-in-out my-2 mb-10">
                {/* Image */}
                {post.image && (
                  <img
                    src={`${API_URL}${post.image}`}
                    alt={post.title}
                    className="w-full h-52 object-cover mb-4 rounded-lg"
                  />
                )}

                {/* Date + Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-[#BB2A1D] text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-bold text-[20px] text-gray-900 mb-1">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.content}
                </p>

                <p className="text-gray-600 text-xs leading-relaxed mb-4">
                  Author by {post.author}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  {/* Likes & Views */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 ">
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center gap-1 transition-transform duration-200 ${
                        hasLiked[post._id]
                          ? "scale-110 text-red-600"
                          : "text-[#BB2A1D] hover:scale-110 hover:text-red-600"
                      }`}
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          hasLiked[post._id]
                            ? "fill-red-600"
                            : "stroke-[#BB2A1D]"
                        }`}
                      />
                      {likes[post._id] || 0}
                    </button>

                    <div className="flex items-center gap-1">
                      <Eye className="w-6 h-6" />
                      {views[post._id] || 0}
                    </div>
                  </div>

                  {/* Read More */}
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#BB2A1D] hover:text-red-700 transition"
                  >
                    READ MORE
                    <span className="bg-[#BB2A1D] h-6 w-6 flex items-center justify-center rounded-full text-white">
                      →
                    </span>
                  </button>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Modal for full post */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl relative overflow-y-auto max-h-[90vh] shadow-2xl animate-fadeIn">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedPost.image && (
              <img
                src={`${API_URL}${selectedPost.image}`}
                alt={selectedPost.title}
                className="w-full h-72 object-cover mb-4 rounded-lg shadow-md"
              />
            )}

            <header>
              <h2 className="text-3xl font-bold text-[#BB2A1D] mb-4">
                {selectedPost.title}
              </h2>
            </header>

            <p className="text-gray-700 leading-relaxed mb-4">
              {selectedPost.content}
            </p>

            <span className="text-sm text-gray-500 italic">
              {selectedPost.category}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostSection;
