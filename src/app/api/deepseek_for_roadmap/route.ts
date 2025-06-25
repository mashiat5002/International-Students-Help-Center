
import { call_push_journey } from '@/app/(utils)/call_push_journey/route';
import extractFullJsonBlock from '@/app/(utils)/extract_obj/extract_obj';
import { NextRequest, NextResponse } from 'next/server';

const journey_prompt = "Create a JavaScript object representing a study program application journey. The object should follow this exact structure:\n\n{\n  id: string, // unique ID\n  title: string, // short title of the journey\n  description: string, // brief description of the application\n  totalSteps: number, // total number of steps\n  currentStep: number, // current step index (0-based)\n  lastUpdated: string, // ISO date format (YYYY-MM-DD)\n  institution: string, // university or institution name\n  program: string, // full name of the program\n  deadline: string, // ISO date format (YYYY-MM-DD)\n  steps: [\n    {\n      title: string, // title of the step\n      description: string, // description of the step\n      status: 'completed' | 'in-progress' | 'not-started'\n    },\n    ...\n  ]\n}\n\nI will provide the following details:\n- Institution:\n- Program:\n- Application Deadline:\n- List of steps (each with title, description, and status):\n\nUse today's date for lastUpdated, assign a unique string to id, and set totalSteps and currentStep appropriately based on the list of steps and their statuses.";


export  async function POST(req: NextRequest) {
  
  
  if (req.method !== 'POST')
    return NextResponse.json({message:"Method Not Allowed"}, {status: 405});

  const body= await req.json();
  

  var message;

  
  
  
  if(body.type=="journey"){
    message="You will provide a roadmap by processing the requirement given by the institute programme, if english language test score is necessary for the programme, mention minimum score details. Also include if the is minimum requirement for previous study score. which will help student to keep track of their application and upload files related in each step to store, remember each step should represent a separate document for submission. add required in the title if the document is compulsory as per requirement, your response should not even contain any character other than the object starting with{ and ending with} sometimes you give ```javascript at the start do not do it, the response should be in this format which a application roadmap in steps key array"+journey_prompt+".All keys must be double quoted. Institution: "+body.university+" Program: "+body.title+" Application Deadline: "+body.deadline+"keep all the status not-started and make sure each single document should be in separate step"
  
  }


  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat-v3-0324"
,
  "messages": [
    { "role": "system", "content": "You are a study advisor for international students. you just provide an object which contains steps of roadmap of the given application" },
    { "role": "user", "content": message }
  ]
      }),
    });

    const data = await response.json();
    
   
    const obj=extractFullJsonBlock(data.choices[0].message.content)
 
    if(obj==null){
      console.log("error in parsing the json object")
   return null}
      try{

        const resp=await call_push_journey(obj)
        return NextResponse.json({message:resp}, {status: 201});
        
      }catch(e){
        console.log("error in pushing the data to mongodb",e)}



    return NextResponse.json({message:data+"But not saved to db"}, {status: 201});
  } catch (error) {
   
    return NextResponse.json({message:"Failed to contact DeepSeek"}, {status: 500});
  }
}
