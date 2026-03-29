import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data,onChange}) => {

      const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
     
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const update = data.filter((_, i) => i !== index);
    onChange(update);
  };

  const updateEducation = (index, field, value) => {
    const update = [...data];
    update[index] = { ...update[index], [field]: value };
    onChange(update);
  };
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              Education
            </h3>
            <p className=" text-sm text-gray-500">Add your education details</p>
          </div>

          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors "
          >
            <Plus className="size-4" />
            Add Education
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>no education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div>
          {data.map((education, index) => (
            <div
              className="p-4 border border-gray-200  rounded-lg space-y-3"
              key={index}
            >
              <div className="flex justify-between items-start">
                <h4>Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="px-3 py-2 text-sm "
                  placeholder="Institution Name"
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="px-3 py-2 text-sm "
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="px-3 py-2 text-sm "
                  placeholder="Field of Study"
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                />

                <input
                  type="month"
                  
                  className="px-3 py-2 text-sm  "
                  placeholder="graduation date"
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                />
              </div>
             
              <input
                  type="text"
                  className="px-3 py-2 text-sm "
                  placeholder="GPA (optional)"
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                />

             
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
