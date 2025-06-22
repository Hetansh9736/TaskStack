import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import { auth } from './Helper/firebase';
import { setUser } from './Redux/Slices/authSlice';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  const dispatch = useDispatch(); // ✅ Add this

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          name: user.name,
          email: user.email,
          uid: user.uid,
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]); // ✅ Include dispatch in deps

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] text-[#E0E0E0]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
