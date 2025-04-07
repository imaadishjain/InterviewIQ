"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, Volume2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react'


function QuestionsSection({mockInterviewQues,activeQuestionIndex}) {


    useEffect(() => {
    // Auto-play when question changes
    if (mockInterviewQues[activeQuestionIndex]?.Question) {
      textToSpeech(mockInterviewQues[activeQuestionIndex].Question);
    }
   }, [activeQuestionIndex]);
    
    
     const textToSpeech=(text)=>
     {
       if('speechSynthesis' in window)
       {
         const speech=new SpeechSynthesisUtterance(text);
         window.speechSynthesis.speak(speech)
       }
       else
       {
        alert("Sorry, Your browser doesnot support text to speech")
       }
     }
    console.log("QuestionsSection - mockInterviewQues:", activeQuestionIndex, mockInterviewQues[activeQuestionIndex]?.Question);
    
  return (
     <div className='p-5 border rounded-lg my-10'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
           {mockInterviewQues && mockInterviewQues.map((ques,index)=>
           {
               return(
                <h2 key={index} className={` p-2 rounded-full text-xs  md:text-sm text-center cursor-pointer ${activeQuestionIndex==index && 'bg-primary text-white'} `}>Question #{index+1}</h2> 
   
               )
               
           })}
          </div>
          
          
          <h2 className='my-5 text-md md:text-lg text-black'>{mockInterviewQues[activeQuestionIndex]?.Question}</h2>
          <Volume2 className='cursor-pointer'  onClick={()=>textToSpeech(mockInterviewQues[activeQuestionIndex]?.Question)}/>

          <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary'>
              <Lightbulb/>
              <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>
              {process.env.NEXT_PUBLIC_NOTE}
            </h2>
          </div>
    </div>
  )
}

export default QuestionsSection
