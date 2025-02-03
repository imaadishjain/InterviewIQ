
"use client"

import React from 'react'
import  { useState } from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { HashLoader } from 'react-spinners'


function Dashboard() {
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
        <div className='p-10'>
       <h2 className='font-bold text-2xl'>Dashboard</h2>
        <h2 className='text-gray-500'>
          Create and Start your AI Mockup Interview
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
        </div>
        <InterviewList  setLoader={setLoader}/>
       </div>
        </div>
      
    
  )
}

export default Dashboard