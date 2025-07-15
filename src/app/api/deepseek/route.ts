
import { NextRequest, NextResponse } from 'next/server';
const prompt = "Generate an array of JSON objects. Each object should represent a graduate program application process. Include the following fields:  \
- `title`: A short name for the application (e.g., \"Computer Science Application\")  \
- `university`: Name of the university  \
- `country`: Country where the university is located  \
- `duration`: Duration of the program  \
- `tuition`: Annual tuition fee  \
- `description`: A brief summary of the program  \
- `institution`: Full institution name  \
- `program`: Full name of the program (e.g., \"Master of Science in Computer Science\")  \
- `deadline`: Application deadline (format: YYYY-MM-DD)  \
";



export  async function POST(req: NextRequest) {
  
  if (req.method !== 'POST')
    return NextResponse.json({message:"Method Not Allowed"}, {status: 405});

  const body= await req.json();
  console.log(body.questions)
  var message;
  var date=new Date();
  var current_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  const combined = [];
  for (let i = 0; i < Math.min(body.questions.length, body.answers.length); i++) {
    combined.push(body.questions[i], body.answers[i]);
  }
  if(body.type=="questions"){
    message="Generate exactly 1 question to understand my ideal study destination. Return the result strictly as a JSON array of strings, with each question properly quoted. Do not include any extra text, formatting, markdown, or explanation. The output must be a valid JSON string.";
  }else if(body.type=="answers"){

    message=current_date+" is today ,suggest only programmes that has deadline not crossed, should be in 2026, make sure the title you give to the programme is provided by the study institution ,do web search, don't give any extra text as it will be a problem to convert the string to an object, so dont give ```json at the start and ``` at the end not even \boxed at the beginning, try to give as much programmes as possible,provide an array of objects with all the study destinations you can suggest based on conversation: :"+combined+" To give response "+prompt;
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
        // "model": "deepseek/deepseek-r1-0528:free"
,
  "messages": [
    { "role": "system", "content": "You are a study advisor for international students. you  suggest study programmes unless it satifies all the answers by the user otherwise you reply in one string that no such programmes available" },
    { "role": "user", "content": message }
  ]
      }),
    });

    const data = await response.json();
    
    

    return NextResponse.json({message:data,}, {status: 201});
  } catch (error) {
    
    return NextResponse.json({message:"Failed to contact DeepSeek "+error}, {status: 500});
  }
}
