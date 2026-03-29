import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const {token}=useSelector(state=>state.auth)
  const [generatingIndex,setGeneratingIndex]=useState(-1)
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const update = data.filter((_, i) => i !== index);
    onChange(update);
  };

  const updateExperience = (index, field, value) => {
    const update = [...data];
    update[index] = { ...update[index], [field]: value };
    onChange(update);
  };

  const generateDescription=async(index)=>{
    setGeneratingIndex(index)
    const experience=data[index];
    const prompt=`enhance this jop description ${experience.description} for the position of ${experience.position}
    at ${experience.company}.  `  

    try {
      const {data}=await api.post('/ai/enhance-job-desc',{userContent:prompt},{headers:{Authorization:token}})
      toast.success(data.message);
      updateExperience(index,"description",data.response)
      // console.log(data)
    } catch (error) {
        toast.error(error.message)
    }finally{
      setGeneratingIndex(-1)
    }

  }
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              Professional Experience
            </h3>
            <p className=" text-sm text-gray-500">Add your job experience</p>
          </div>

          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors "
          >
            <Plus className="size-4" />
            Add Experience
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>no work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div>
          {data.map((experience, index) => (
            <div
              className="p-4 border border-gray-200  rounded-lg space-y-3"
              key={index}
            >
              <div className="flex justify-between items-start">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Company Name"
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Job Title"
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                />

                <input
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Start Date"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                />

                <input
                  type="month"
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                  placeholder="End Date"
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                />
              </div>
              <label className="flex items-center gap-1" htmlFor="">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked ? true : false,
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor=""
                  >
                    Jop Description
                  </label>
                  <button disabled={generatingIndex === index || !experience.position || !experience.company} onClick={()=>generateDescription(index)} className="flex items-center gap-1 px-2 py-1 text-sm bg-purple-100 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                    {generatingIndex==index ? (<Loader2 className="w-3 h-3 animate-spin" />) :(<Sparkles className="w-3 h-3" />)}
                   
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  placeholder="Describe your key responsibilities and achievements..."
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
