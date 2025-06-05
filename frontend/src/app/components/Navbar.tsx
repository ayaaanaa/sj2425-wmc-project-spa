"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-col items-center gap-12 bg-[#16161a]">
      <nav className="nav text-lg">
        <ul className="flex space-x-6">
          <li className="p-3 border-b-2 text-3xl font-bold text-[#eebbc3] mb-4 border-opacity-0 hover:border-opacity-100 hover:text-emerald-50 duration-200 cursor-pointer">
            <Link href="/">Hinzufügen</Link>
          </li>
          <li className="p-3 border-b-2 text-3xl font-bold text-[#eebbc3] mb-4 border-opacity-0 hover:border-opacity-100 hover:text-emerald-50 duration-200 cursor-pointer">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

