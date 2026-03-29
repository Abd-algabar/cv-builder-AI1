import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data,onChange}) => {
       const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
     
     
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const update = data.filter((_, i) => i !== index);
    onChange(update);
  };

  const updateProject = (index, field, value) => {
    const update = [...data];
    update[index] = { ...update[index], [field]: value };
    onChange(update);
  };
  return (
   <div >
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              Projects
            </h3>
            <p className=" text-sm text-gray-500">Add your project </p>
          </div>

          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors "
          >
            <Plus className="size-4" />
            Add Project
          </button>
        </div>
      </div>
     
        <div className='space-y-4 mt-6'>
          {data.map((project, index) => (
            <div
              className="p-4 border border-gray-200  rounded-lg space-y-3"
              key={index}
            >
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid  gap-3">
                <input
                  type="text"
                  className="px-3 py-2 text-sm rounded-lg "
                  placeholder="Project Name"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="px-3 py-2 text-sm  rounded-lg"
                  placeholder="Project Type"
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                />

                <textarea
                    rows={4}
                  type="text"
                  className="w-full px-3 py-2 text-sm  rounded-lg resize-none"
                  placeholder="Describe your project..."
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                />

             
              </div>
             
             

             
            </div>
          ))}
        </div>
     
    </div>
  )
}

export default ProjectForm
