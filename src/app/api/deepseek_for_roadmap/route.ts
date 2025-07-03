import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import extractFullJsonBlock from "@/app/(utils)/extract_obj/extract_obj";
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import Journey from "@/app/models/journey";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const journey_prompt =
  "Create a JavaScript object representing a study program application journey. The object should follow this exact structure:\n\n{\n  id: string, // unique ID\n  title: string, // short title of the journey\n  description: string, // brief description of the application\n  totalSteps: number, // total number of steps\n  currentStep: number, // current step index (0-based)\n  lastUpdated: string, // ISO date format (YYYY-MM-DD)\n  institution: string, // university or institution name\n  program: string, // full name of the program\n  deadline: string, // ISO date format (YYYY-MM-DD)\n  steps: [\n    {\n      title: string, // title of the step\n      description: string, // description of the step\n      status: 'completed' | 'in-progress' | 'not-started'\n    },\n    ...\n  ]\n}\n\nI will provide the following details:\n- Institution:\n- Program:\n- Application Deadline:\n- List of steps (each with title, description, and status):\n\nUse today's date for lastUpdated, assign a unique string to id, and set totalSteps and currentStep appropriately based on the list of steps and their statuses.";

export async function POST(req: NextRequest) {
  if (req.method !== "POST")
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );

  const body = await req.json();

  var message;

  if (body.type == "journey") {
    message =
      "You will provide a roadmap by processing the requirement given by the institute programme, if english language test score is necessary for the programme, mention minimum score details. Also include if the is minimum requirement for previous study score. which will help student to keep track of their application and upload files related in each step to store, remember each step should represent a separate document for submission. add required in the title if the document is compulsory as per requirement, your response should not even contain any character other than the object starting with{ and ending with} sometimes you give ```javascript at the start do not do it, the response should be in this format which a application roadmap in steps key array" +
      journey_prompt +
      ".All keys must be double quoted. Institution: " +
      body.university +
      " Program: " +
      body.title +
      " Application Deadline: " +
      body.deadline +
      "keep all the status not-started and make sure each single document should be in separate step";
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324",
          messages: [
            {
              role: "system",
              content:
                "You are a study advisor for international students. you just provide an object which contains steps of roadmap of the given application",
            },
            { role: "user", content: message },
          ],
        }),
      }
    );

    const data = await response.json();

    // extracting the JSON object from the response
    const obj = extractFullJsonBlock(data.choices[0].message.content);
    if (!obj) {
      console.log("No valid JSON object found in the response");
      return NextResponse.json(
        { message: "No valid JSON object found in the response" },
        { status: 400 }
      );
    }
    // parsing the JSON object to make it usable
    const object = JSON.parse(obj);

    if (obj == null) {
      console.log("error in parsing the json object");
      return NextResponse.json({ message: "Error in parsing the JSON object" }, { status: 400 });
    }
    try {
      // fetching email of logged in user
      const session = cookies().get("student-session")?.value;
      if (!session) {
        console.log("Session not found");
        return NextResponse.json(
          { message: "Session not found" },
          { status: 404 }
        );
      }


      // decrypting the session to get user details cannot be done in the server side as it is not secure
      const details = (await decrypt(session)) as {
        Email: string;
        expires: string;
        Password: string;
        iat: number;
        exp: number;
      };

      try {
        await connectToDatabase();
        const newJourney = new Journey({
          id: details.Email,
          title: object.title,
          description: object.description,
          totalSteps: object.totalSteps,
          currentStep: 0,
          lastUpdated: new Date(),
          institution: object.institution,
          program: object.program,
          deadline: object.deadline,
          steps: object.steps.map((step: any) => ({
            description: step.description,
            title: step.title,
            status: "not-started",
          })),
        });
        const saved = await newJourney.save();

        if (saved && saved._id) {
          console.log("✅ Journey saved successfully:", saved);
         
          return NextResponse.json({ message: "Journey saved successfully" }, { status: 201 });
        } else {
          console.log("⚠️ Failed to save journey.");
          return NextResponse.json(
            { message: "Failed to save journey" },
            { status: 500 }
          );
        }
      } 
      
      
      
      
      // error handling for POST request
      catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }

      
    } catch (e) {
      console.log("error in pushing the data to mongodb", e);
    }

    return NextResponse.json(
      { message: data + "But not saved to db" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to contact DeepSeek" },
      { status: 500 }
    );
  }
}
