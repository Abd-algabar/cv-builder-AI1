import imageKit from "../config/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs'

// post: /api/resume/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({
      userId,
      title,
    });
    res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete: /api/resume/delete/:id
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ _id: resumeId, userId });

    // return success message
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get: /api/resume/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    res.status(200).json({ resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get resume bu id public
// get: /api/resume/public/

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, public: true });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    res.status(200).json({ resume });
  } catch (error) {
    console.error("Error in  getPublicResumeById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for updating resume
// put: /api/resume/update/
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    
    
    const image = req.file;
    let resumeDataCopy ;
    if (typeof resumeData === 'string') {
        resumeDataCopy =await JSON.parse(resumeData);
    }else{
      resumeDataCopy =structuredClone(resumeData)
    }
    
    

    if (image) {
        const imageBufferData=fs.createReadStream(image.path)
      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.jpg",
        folder :"user-resumes",
        transformation:{
            pre:'w-300,h-300,fo-face,z-0.75'+ (removeBackground ? ',e-bgremove':"")
        }
      });
      resumeDataCopy.personal_info.image=response.url
    }
    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      resumeDataCopy,
      { new: true },
    );

 
   
    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    console.error("Error in  updateResume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
