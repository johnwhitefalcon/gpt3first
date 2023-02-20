
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  

  const animal = req.body.animal  || '';
  
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    res.status(200).json({result: completion.data.choices[0].text});



 
}


function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `${capitalizedAnimal}`;
    
}


