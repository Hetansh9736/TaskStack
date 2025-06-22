import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Helper/firebase';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
console.log(user)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'Post'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const postData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || null,
          };
        });
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Post', id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#60a5fa] mb-6">Latest Posts</h1>

      {loading ? (
        <p className="text-center text-white">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-2">{post.title}</h2>
              <p className="text-[#cbd5e1] text-sm mb-4">{post.content}</p>
              <div className="text-[#94a3b8] text-xs mb-2">by {post.author}</div>
              <div className="text-[#64748b] text-xs">
                {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
              </div>

              {user?.uid === post.uid && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
