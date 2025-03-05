"use client";
import React from "react";
import Image from "next/image";
import {  UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import Link from "next/link";
function Header() {
  const path = usePathname().split("/").filter(Boolean).pop();


  return (
    <div className="flex p-5 item-center justify-between bg-secondary shadow-sm ">
      <Link href='/'>
      <Image src={"/logo3.png"} width={160} height={100} alt="logo" />
      </Link>
      
      <div className="hidden md:flex gap-12 ">
        <div
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            
            ${path == "dashboard" && "text-primary font-bold"}

            
           `}
        >
        <Link href="/dashboard"> 
        Dashboard
        </Link>
    
        </div>


        <div
          className={`text-black  transition-all cursor-pointer 
            
            ${path != "feedback" && path!="dashboard" && "text-primary font-bold"}

            
            `}
        >
          AI Mock Interviews
        </div>

        <div
          className={`text-black transition-all cursor-pointer 
            
            ${path == "feedback"  && "text-primary font-bold"}

            
            `}
        >
          Feedback
        </div>
      </div>   
      <UserButton />
    </div>
  );
}

export default Header;

