import { useContext, useEffect } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { PostContext } from "../context/usePostContext";

const Footer = () => {
  const { posts, dispatch } = useContext(PostContext);

  // Fetch posts when footer loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post");
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "GET_POST", payload: data });
        }
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <footer className="bg-[#181818] text-white pt-16 pb-10 px-6 lg:px-20 font-montserrat">
      <div className="grid md:grid-cols-3 gap-12">

        {/* ✅ Recent Posts from DB */}
        <div>
          <h2 className="font-montserrat font-bold text-xl text-[#BB2A1D] mb-6">
            RECENT POSTS
          </h2>
          <ul className="space-y-4">
            {posts.slice(0, 4).map((post) => (
              <li key={post._id}>
                <p className="text-white">{post.title}</p>
                <span className="text-sm text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo + Info */}
        <div className="text-center md:text-left">
          <h2 className="font-montserrat font-bold text-2xl text-[#BB2A1D] mb-4">
            MSUKC
          </h2>
          <p className="text-gray-300 mb-6">
            Fight School has specialized in martial arts since 1986 and has one
            of the most innovative programs in the nation.
          </p>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center justify-center md:justify-start gap-4">
              <MapPin className="w-6 h-6 text-[#BB2A1D]" /> MSU CSPEAR Grandstand, Room 13
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-6 h-6 text-[#BB2A1D]" /> +63 917 638 0491
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-6 h-6 text-[#BB2A1D]" /> 
msukc1972@gmail.com
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <a href="https://www.facebook.com/MindanaoStateUniversityKarateClub1972"><Facebook className="w-5 h-5 text-white hover:text-[#BB2A1D] cursor-pointer transition" /></a>
            <a href="https://www.instagram.com/msukchonbu/"><Instagram className="w-5 h-5 text-white hover:text-[#BB2A1D] cursor-pointer transition" /></a>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h2 className="font-montserrat font-bold text-xl text-[#BB2A1D] mb-6">
            SUBSCRIBE NOW
          </h2>
          <p className="text-gray-300 mb-4">
            Subscribe to our Newsletter to be updated. We promise not to spam.
          </p>
          <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 text-black focus:outline-none"
            />
            <button className="bg-[#BB2A1D] px-5 py-3 hover:bg-[#a22518] transition">
              <Mail className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MSUKC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
