import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Helper/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      const updatedUser = auth.currentUser;

      dispatch(setUser({
        name: updatedUser.displayName,
        email: updatedUser.email,
        uid: updatedUser.uid,
      }));

      reset();
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="bg-[#161b22] p-8 rounded-xl border border-[#30363d] shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#58a6ff] mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-sm text-[#8b949e] mb-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white placeholder:text-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#8b949e] mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white placeholder:text-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#8b949e] mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white placeholder:text-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#238636] hover:bg-[#2ea043] text-white py-2 px-4 rounded-md font-medium transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-[#8b949e] mt-5 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#58a6ff] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
