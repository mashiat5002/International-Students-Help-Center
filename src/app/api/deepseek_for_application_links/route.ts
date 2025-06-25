
import { call_push_application_links } from '@/app/(utils)/call_push_application_links/route';
import extractFullJsonBlock from '@/app/(utils)/extract_obj/extract_obj';
import { NextRequest, NextResponse } from 'next/server';




export  async function POST(req: NextRequest) {
  
  
  if (req.method !== 'POST')
    return NextResponse.json({message:"Method Not Allowed"}, {status: 405});

  const body= await req.json();
  
  var message;

  if(body.type=="Application_Links"){
    message= `provide all information for ${body.title}
${body.university}
in this given format, {
  "journeyId": string;
  "title": string;
  "institution": string;
  "program": string;
  "deadline": string ;
  "applicationUrl": string;
  "emailAddresses": {
    "admissions": string;
    "department": string;
    "international": string;
  };
  "requirements": string[];
  "documents": string[];
  "tips": string[];
  "additionalResources": {
    "title": string;
    "url": string;
    "description": string;
  }[];
}`

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
    { "role": "system", "content": "You are a study advisor for international students. you just provide an object which contains information as mentioned" },
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

        const resp=await call_push_application_links(obj)
        return NextResponse.json({message:resp}, {status: 201});
        
      }catch(e){
        console.log("error in pushing the data to mongodb",e)}



    return NextResponse.json({message:data+"But not saved to db"}, {status: 201});
  } catch (error) {
   
    return NextResponse.json({message:"Failed to contact DeepSeek"}, {status: 500});
  }
}
