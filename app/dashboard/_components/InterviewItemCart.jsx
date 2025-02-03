/*"use client";
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { MdDelete } from "react-icons/md";
import { eq } from 'drizzle-orm';
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { v4 as uuidv4 } from "uuid";

import moment from "moment/moment";


function InterviewItemCart({ interview, onRemove ,setLoader}) {
  const router = useRouter();
  const {user}=useUser();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const[loading,setLoading]=useState(false);
  
   
  useEffect(()=>
    {
        console.log("Hii",interview.jobNumberOfQues);

    },[])
  const onDelete = async () => {
    setDeleteStatus(true);
    await db.delete(MockInterview).where(eq(MockInterview?.mockId, interview?.mockId));
    setDeleteStatus(false);
    onRemove(interview.mockId);
  };

  const StartNewInterview=async ()=>
    {
    
     setLoader(true);
     const InputPrompt = `
     Job Positions: ${interview.jobPosition}, 
     Job Description: ${interview.jobDesc}, 
     Years of Experience: ${interview.jobExperience}. 
     Based on this information, please provide ${interview.jobNumberOfQues} technical theory interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.`;
 
     try
     {
       const result = await chatSession.sendMessage(InputPrompt);
       let MockJsonResponse = result.response.text();
     MockJsonResponse = MockJsonResponse.replace(/```json|```/g, "");
 
    
 
     if (MockJsonResponse) {
       const res = await db
         .insert(MockInterview)
         .values({
           mockId: uuidv4(),
           jsonMockResp: MockJsonResponse,
           jobPosition: interview.jobPosition,
           jobDesc: interview.jobDesc,
           jobExperience: interview.jobExperience,
           jobNumberOfQues: interview?.jobNumberOfQues,
           createdBy: user?.primaryEmailAddress?.emailAddress,
           createdAt: moment().format("DD-MM-yyyy"),
         })
         .returning({ mockId: MockInterview.mockId });
 
       console.log("Inserted id:", res);
       if (res) {
         
         router.push("/dashboard/interview/" + res[0]?.mockId);
         onDelete();
        
       }
     } else {
       console.log("Error");
     }
     setLoading(false);
     }catch(error)
     {
       setLoading(false);
       toast(error.message)
     }
     setLoader(false);
     
    }

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  };

  const onFeedback = () => {
    router.push('/dashboard/interview/' + interview?.mockId + "/feedback");
  };

  return (

       <div className='border shadow-sm rounded-lg p-6 relative w-full max-w-lg mx-auto'>
      <div className='absolute top-4 right-4 cursor-pointer' onClick={onDelete}>
        {!deleteStatus ? (
          <MdDelete className='text-red-500 hover:text-red-700 w-8 h-8' />
        ) : (
          <h2 className='text-lg text-red-500'>Deleting...</h2>
        )}
      </div>

      <h2 className='font-bold text-primary text-2xl'>{interview?.jobPosition}</h2>
      <h2 className='text-lg text-gray-600'>{interview?.jobExperience} Year of Experience</h2>
      <h2 className='text-sm text-gray-400'>Created At: {interview?.createdAt}</h2>

      <div className='flex justify-between mt-4 gap-5'>
        <Button size="sm" variant="outline" className=" text-lg" onClick={onFeedback}>Feedback</Button>
        <Button size="sm" className=" text-lg" onClick={StartNewInterview}>Start Interview</Button>
      </div>
    </div>
    
  );
}

export default InterviewItemCart;*/

"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { MdDelete } from "react-icons/md";
import { eq } from "drizzle-orm";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";

function InterviewItemCart({ interview, onRemove, setLoader }) {
  const router = useRouter();
  const { user } = useUser();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Interview data loaded:", interview.jobNumberOfQues);
  }, []);

  const onDelete = async () => {
    setDeleteStatus(true);
    try {
      console.log("Deleting mockId:", interview.mockId);
      const resp = await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockId, interview.mockId))
        .returning();
      console.log("Delete data", resp);
      onRemove(interview.mockId);
    } catch (error) {
      console.error("Error deleting interview:", error);
    } finally {
      setDeleteStatus(false);
    }
  };

  const startNewInterview = async () => {
    setLoader(true);
    await onDelete();
    const inputPrompt = `
    Job Position: ${interview.jobPosition}, 
    Job Description: ${interview.jobDesc}, 
    Years of Experience: ${interview.jobExperience}. 
    Based on this information, please provide ${interview.jobNumberOfQues} technical theory interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      let mockJsonResponse = result.response.text();
      mockJsonResponse = mockJsonResponse.replace(/```json|```/g, "");

      if (mockJsonResponse) {
        const res = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: mockJsonResponse,
            jobPosition: interview.jobPosition,
            jobDesc: interview.jobDesc,
            jobExperience: interview.jobExperience,
            jobNumberOfQues: interview.jobNumberOfQues,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });
        console.log("Inserted interview ID:", res);
        if (res) {
          router.push("/dashboard/interview/" + res[0]?.mockId);
          // Remove the old interview entry
        }
      } else {
        console.error("Error: No valid JSON response received.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message);
    }
    setLoader(false);
  };

  const onStart = () => {
    router.push("/dashboard/interview/" + interview.mockId);
  };

  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 md:p-6 w-full max-w-lg mx-auto">
      {/* Delete Icon and Job Position on the same line */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-lg sm:text-xl md:text-2xl">
          {interview.jobPosition}
        </h2>
        <div className="cursor-pointer" onClick={onDelete}>
          {!deleteStatus ? (
            <MdDelete className="text-red-500 hover:text-red-700 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          ) : (
            <h2 className="text-sm md:text-lg text-red-500">Deleting...</h2>
          )}
        </div>
      </div>

      <h2 className="text-sm sm:text-md md:text-lg text-gray-600">
        {interview.jobExperience} Year(s) of Experience
      </h2>
      <h2 className="text-xs sm:text-sm text-gray-400">
        Created At: {interview.createdAt}
      </h2>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2 sm:gap-3 md:gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full sm:w-auto text-sm md:text-lg"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full sm:w-auto text-sm md:text-lg"
          onClick={startNewInterview}
        >
          Start New Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCart;
