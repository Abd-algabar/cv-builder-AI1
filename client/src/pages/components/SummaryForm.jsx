import { Loader2, Sparkles } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import api from '../../config/api';
import toast from 'react-hot-toast';

const SummaryForm = ({data,onChange,setResumeData}) => {
    const {token} =useSelector(state=>state.auth);
    const [isGenerating,setIsGenerating]=useState(false)
    const GenerateSummary= async()=>{
        try {
            setIsGenerating(true);

            const response =await api.post('/ai/enhance-pro-sum',{userContent:data},{headers:{Authorization:token}})

            setResumeData(pre=>({...pre,professional_summary:response.data.response}))
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message ||error.message)
        }finally{
            setIsGenerating(false)
        }
    }
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                    Professional Summary
                </h3>
                <p className=' text-sm text-gray-500'>
                    Add summary for your resume here
                </p>
            </div>

            <button disabled={isGenerating} onClick={GenerateSummary} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                {isGenerating ? (<Loader2 className='size-4 animate-spin' />):(<Sparkles className='size-4'/>) }
                {isGenerating ?"Enhancing":" AI Enhance "}
               
            </button>
        </div>

        <div className='mt-6'>
            <textarea rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' value={data ||''} onChange={(e)=>onChange(e.target.value)} placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...' ></textarea>
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>
                Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
            </p>
        </div>
      
    </div>
  )
}

export default SummaryForm
