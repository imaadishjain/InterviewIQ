"use client"
import React from 'react'
import Header from './_components/Header'
import { Toaster } from '@/components/ui/sonner'
import { HashLoader } from 'react-spinners';
import { useState } from 'react';

function Dashboardlayout({children}) {
  const[loader,setLoader]=useState(false);
  if (loader) {
    return (
      <div className="flex items-center justify-center mt-20">
        <HashLoader color="#4845D2" />
      </div>
    );
  }

  return (
    <div>
     <Header setLoader={setLoader}/>
     <div className='mx-5 md:mx-20 lg:mx-36'>
     <Toaster/>
     {children}
     </div>
   
    </div>
  )
}

export default Dashboardlayout
