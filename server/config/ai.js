// import { GoogleGenAI } from "@google/genai";

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const api=process.env.GEMINI_API_KEY

// // const ai = new GoogleGenAI({api});
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// async function Ai(contents) {
//   try {
//       const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: contents,
//   });
//   console.log(response.text())
//   return response.text
    
//   } catch (error) {
//     console.log("error in ai ",error)

//   }

// }

// export default Ai

// import OpenAI from "openai";

// const openai = new OpenAI({
//         baseURL: 'https://api.deepseek.com',
//         apiKey: process.env.DEEPSEEK_API_KYE,
// });

// async function Ai(contents) {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "deepseek-chat",
//   });

//   console.log(completion.choices[0].message.content);
// }

// export default Ai





import { createUserContent, GoogleGenAI } from "@google/genai";
const Api = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ Api });


const Ai=async(prompt)=>{
// const prompt ='hi hoe are you'

const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents:createUserContent([
            prompt,
            
        ])
    });
    console.log(response.text)
    return response.text

}
 export default Ai