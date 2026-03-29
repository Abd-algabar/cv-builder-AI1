import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import Loader from "./components/Loader";
import ResumePreview from "./components/ResumePreview";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import api from "../config/api";

const Preview = () => {
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResumeData = async () => {
    try {
        const {data}=await api.get('/resume/public/'+resumeId);
        setResumeData(data.resume);

    } catch (error) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    loadResumeData();
  }, []);
  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-center text-6xl text-slate-400">Resume not found</p>
          <a
            href="/"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
          >
            
            go to home page
            <ArrowRightIcon className="ml-2 size-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
