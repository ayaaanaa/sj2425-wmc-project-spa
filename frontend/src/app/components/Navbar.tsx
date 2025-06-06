"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-col items-center gap-8 bg-gradient-to-b from-[#232946] to-[#16161a] py-6 shadow-lg rounded-b-3xl">
      <div className="flex items-center gap-3 mb-2">
        
          <span className="text-3xl animate-bounce">🪐</span>
          <h1 className="text-4xl font-extrabold text-[#eebbc3] tracking-wide drop-shadow">Space Explorer</h1>
          <span className="text-3xl animate-pulse">✨</span>
        
      </div>
      <nav className="nav text-lg">
        <ul className="flex space-x-8">
          <li className="p-3 border-b-2 text-2xl font-bold text-[#eebbc3] border-opacity-0 hover:border-[#eebbc3] hover:border-opacity-100 hover:text-emerald-50 duration-200 cursor-pointer transition-all">
            <Link href="/edit">
              <span role="img" aria-label="add">➕</span> Edit
            </Link>
          </li>
          <li className="p-3 border-b-2 text-2xl font-bold text-[#eebbc3] border-opacity-0 hover:border-[#eebbc3] hover:border-opacity-100 hover:text-emerald-50 duration-200 cursor-pointer transition-all">
            <Link href="/">
              <span role="img" aria-label="home">🏠</span> Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}