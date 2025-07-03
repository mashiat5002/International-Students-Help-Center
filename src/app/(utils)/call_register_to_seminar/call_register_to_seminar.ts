import { call_fetch_logged_id_info } from "../call_fetch_logged_id_info/call_fetch_logged_id_info";

export async function call_register_to_seminar(seminarID:string,purpose:string) {
   
    console.log("seminarID-purpose");
    console.log(seminarID, purpose);
    const participatDetails=await  call_fetch_logged_id_info()
    console.log(participatDetails);
  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/register_to_seminar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      participantName: participatDetails.full_name,
      participantEmail: participatDetails.email,
      seminarID: seminarID,
      purpose: purpose
    })
  });
  const final_res = await res.json();
  return final_res;
}