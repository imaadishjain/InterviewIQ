"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { StopCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
function RecordAnswerSection({
  mockInterviewQues,
  activeQuestionIndex,
  interviewData,
  setActiveQuestionIndex,
  lastIndex,
}) {
  const [userAnswer, setUserAnswer] = useState(" ");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const router = useRouter();
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  const UpdateUserAnswer = async () => {
    console.log("Printing userAns", userAnswer);
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQues[activeQuestionIndex]?.Question +
      ", User Answer:" +
      userAnswer +
      ",Depends on question and answer for given interview question please give us rating (should be from 1 to 5 )  for answer and feedback as area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const JsonFeedbackResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const data = JSON.parse(JsonFeedbackResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQues[activeQuestionIndex]?.Question,
      correctAns: mockInterviewQues[activeQuestionIndex]?.Answer,
      userAns: userAnswer,
      feedback: data.feedback,
      rating: data.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
      if (lastIndex == activeQuestionIndex) {
        router.push(
          "/dashboard/interview/" + interviewData?.mockId + "/feedback"
        );
      } else {
        setActiveQuestionIndex(activeQuestionIndex + 1);
      }
    } else {
      alert("Some error while updating to DataBase");
    }

    setResults([]);
    setLoading(false);
  };

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          className="absolute"
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="webcam"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center text-primary text-xl mt-6 ">
          Please wait, the answer is being saved in the database.
          <BarLoader color="#4845D2" />
        </div>
      ) : (
        <Button
          disabled={loading}
          variant="outline"
          className="my-10"
          onClick={() => StartStopRecording()}
        >
          {isRecording ? (
            <h2 className="text-red-600 items-center animate-pulse flex gap-2">
              <StopCircle /> Stop Recording...
            </h2>
          ) : (
            <h2 className="text-primary flex gap-2 items-center">
              <Mic /> Record Answer
            </h2>
          )}
        </Button>
      )}
    </div>
  );
}

export default RecordAnswerSection;
