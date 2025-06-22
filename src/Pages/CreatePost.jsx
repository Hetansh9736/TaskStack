import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Helper/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function CreatePost() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'Post'), {
        title: data.title,
        content: data.content,
        author: user.name || user.email,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      reset();
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 mt-10 bg-[#0f172a] text-[#f1f5f9] border border-[#1e293b] rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-semibold mb-8 text-center text-[#38bdf8]">Create New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="text-sm block mb-1 text-slate-400">Post Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="w-full px-4 py-3 bg-[#1e293b] text-white border border-[#334155] rounded-lg focus:ring-2 focus:ring-[#38bdf8] outline-none"
            placeholder="Enter post title"
          />
        </div>
        <div>
          <label className="text-sm block mb-1 text-slate-400">Post Content</label>
          <textarea
            {...register('content', { required: true })}
            rows={6}
            className="w-full px-4 py-3 bg-[#1e293b] text-white border border-[#334155] rounded-lg resize-none focus:ring-2 focus:ring-[#38bdf8] outline-none"
            placeholder="Write something inspiring..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#38bdf8] hover:bg-[#0ea5e9] transition-all rounded-lg text-black font-semibold"
        >
          Publish Post
        </button>
      </form>
    </motion.div>
  );
}

export default CreatePost;
