import React from "react";
import { Bell, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex items-center justify-between px-5 lg:px-10 py-4 bg-white border-b border-gray-200 shadow-sm ">
      <div className='rounded-full w-9 h-9 bg-cyan-600 flex justify-center items-center'>
        <span className="text-sm text-white font-bold">S</span>
      </div>

      <div className='flex justify-center items-center gap-3'>
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => console.log("Notifications clicked")}
          aria-label="Notifications"
        >
          <Bell size={22} className="text-gray-700" />
          {/* Optional notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div onClick={() => { navigate('/') }} className="cursor-pointer">Logout</div>
      </div>

    </nav>
  );
}