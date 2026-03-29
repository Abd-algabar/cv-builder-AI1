import Ai from "../config/ai.js";
import Resume from "../models/Resume.js";
//post : api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "missing required fields" });
    }

    // const content = `
    //     you are an expert in resume writing your task is to enhance the professional summary of a resume . the summary
    //     should be only 1-2 sentences also highlighting key skills ,
    //     experience, and career objectives . make it compelling and
    //     ATS-friendly. and only return text on options or anything else.
    //     ${userContent}
    //     `;

    const content = `
You are an expert resume writer.

Improve the following professional summary.

Rules:
- Return ONLY one improved professional summary.
- The summary must be 1–2 sentences only.
- Highlight key skills, experience, and career objectives.
- Make it compelling and ATS-friendly.
- Do NOT provide multiple options.
- Do NOT add explanations, titles, or bullet points.
- Return plain text only.

Professional summary:
${userContent}
`;
    const response = await Ai(content);

    res.status(200).json({ message: "enhance successfully", response });
  } catch (error) {
    console.log("error in enhanceProfessionalSummary", error);
    res.status(500).json({ message: "internal server error" });
  }
};

// post: api/ai/enhance-job-desc

export const enhanceJobDesc = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "missing required fields" });
    }

    // const content = `
    //     you are an expert in resume writing. your task is to enhance the job description of a resume .
    //      the job  description
    //     should be only 1-2 sentences also highlighting key responsibilities and achievements ,
    //     use action verbs and quantifiable results where possible
    //     . make it
    //     ATS-friendly. and only return text on options or anything else.
    //     ${userContent}
    //     `;

    const content = `
You are an expert resume writer.

Your task is to improve the following resume job description.

Rules:
- Return ONLY one improved job description.
- The description must be 1–2 sentences only.
- Highlight key responsibilities and achievements.
- Use strong action verbs and include quantifiable results when possible.
- Make it ATS-friendly.
- Do NOT provide multiple options.
- Do NOT add explanations, titles, numbering, or bullet points.
- Return plain text only.

Job description:
${userContent}
`;
    const response = await Ai(content);

    res.status(200).json({ message: "enhance successfully", response });
  } catch (error) {
    console.log("error in enhanceJobDesc", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//post:api/ao/upload-resume

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const content = `
        you are an expert AI Agent to extract data from resume.
        extract data from this resume:
        ${resumeText}

        provide data in the following  JSON format with no additional text before 
        or after :
        {
            personal_info:{
        image:{type: String, default: ''},
        full_name:{type: String, default: ''},
        profession:{type: String, default: ''},
        email:{type: String, default: ''},
        phone:{type: String, default: ''},
        location:{type: String, default: ''},
        linkedIn:{type: String, default: ''},
        website:{type: String, default: ''},
    },
    experience:[
        {
            company:{type: String, default: ''},
            position:{type: String, default: ''},
            start_date:{type: String, default: ''},
            end_date:{type: String, default: ''},
            description:{type: String, default: ''},
            is_current:{type: Boolean, default: false},
        }
    ],
    project:[
        {
            name:{type: String, default: ''},
            type:{type: String, default: ''},
            description:{type: String, default: ''},
            
        }
    ],
    education:[
        {
            institution:{type: String, default: ''},
            degree:{type: String, default: ''},
            field:{type: String, default: ''},
            graduation_date:{type: String, default: ''},
            gpa:{type: String, default: ''},
        }
    ]
        }

        `;
    const response = await Ai(content);

    const paresData = JSON.parse(response);
    console.log(response)
    const newResume = await Resume.create({ userId, title, ...paresData });

    res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    console.log("error in uploadResume", error);
    res.status(500).json({ message: "internal server error" });
  }
};
