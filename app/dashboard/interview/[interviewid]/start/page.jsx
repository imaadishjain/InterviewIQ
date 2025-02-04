"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import { HashLoader } from 'react-spinners';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const pathname = usePathname();
  const interviewId = pathname.split("/")[3];
  const [mockInterviewQues, setMockInterviewQues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [interviewData, setInterviewData] = useState();


  useEffect(() => {
    if (interviewId) {
      getInterviewDetails();
    }
  }, [interviewId]);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      console.log("Database query result:", result);

      if (result.length > 0 && result[0].jsonMockResp) {
        const parsedData = JSON.parse(result[0].jsonMockResp);
        console.log("Parsed data:", parsedData);
        const questionsArray = Array.isArray(parsedData) ? parsedData : [parsedData];
        setMockInterviewQues(questionsArray);
        setInterviewData(result[0]);
      } else {
        console.error("No data found for the given interviewId");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <HashLoader color="#4845D2" />
      </div>
    );
  }

  return (
    <div>
      {mockInterviewQues ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <QuestionsSection mockInterviewQues={mockInterviewQues} activeQuestionIndex={activeQuestionIndex} />
            {interviewData && (
              <div className="flex flex-col items-center w-full">
                <RecordAnswerSection mockInterviewQues={mockInterviewQues} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData} setActiveQuestionIndex={setActiveQuestionIndex} lastIndex={mockInterviewQues?.length-1} />
                
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>No questions available. Please try again later.</div>
      )}
    </div>
  );
}

export default StartInterview;




/*"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import { FidgetSpinner } from 'react-loader-spinner';
import { HashLoader } from 'react-spinners';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';

function StartInterview({ params }) {
  const pathname = usePathname();
  const interviewId = pathname.split("/")[3];
  const [mockInterviewQues, setMockInterviewQues] = useState(null);
  const [loading, setLoading] = useState(true);
  const[activeQuestionIndex,setactiveQuestionIndex]=useState(0);
  const[interviewData,setInterviewData]=useState();

  useEffect(() => {
    if (interviewId) {
      getInterviewDetails();
    }
  }, [interviewId]);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      console.log("Database query result:", result);

      if (result.length > 0 && result[0].jsonMockResp) {
        const parsedData = JSON.parse(result[0].jsonMockResp);
        console.log("Parsed data:", parsedData);
        setMockInterviewQues(parsedData);
        setInterviewData(result[0]);
      } else {
        console.error("No data found for the given interviewId");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  

  if (loading) {
    
     return (
      <div>
        <div className='flex items-center justify-center mt-20'>
          <HashLoader color='#4845D2'/>
        </div>
      </div>
     );
  }

  return (
    <div>
      <div>
        {mockInterviewQues ? (
          
          <div>
            
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <QuestionsSection mockInterviewQues={mockInterviewQues} activeQuestionIndex={activeQuestionIndex}/>
          
          { interviewData && 
            <RecordAnswerSection mockInterviewQues={mockInterviewQues} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
          }
          </div>


          <div className='flex justify-end items-center  gap-6 '>
            <Button>Previous Question</Button>
            <Button>Next Question</Button>
            <Button>End Interview</Button>
          </div>
          </div>
          
           
          
          
        ) : (
          <div>No questions available Please try again later.</div>
        )
        
        }
      </div>
    </div>
  );
}

export default StartInterview;*/
