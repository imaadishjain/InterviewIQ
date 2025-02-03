"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname().split("/").filter(Boolean).pop();

  return (
    <div className="flex p-5 item-center justify-between bg-secondary shadow-sm ">
      <Image src={"/logo3.png"} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-12  ">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            
            ${path == "dashboard" && "text-primary font-bold"}

            
           `}
        >
          Dashboard
        </li>


        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            
            ${path != "feedback" && path!="dashboard" && "text-primary font-bold"}

            
            `}
        >
          AI Mock Interviews
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            
            ${path == "feedback"  && "text-primary font-bold"}

            
            `}
        >
          Feedback
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
