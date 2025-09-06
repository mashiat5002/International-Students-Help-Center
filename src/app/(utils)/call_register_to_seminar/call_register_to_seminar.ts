
export async function call_register_to_seminar(seminarID:string,purpose:string) {
   

  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/register_to_seminar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      seminarID: seminarID,
      purpose: purpose
    })
  });
  const final_res = await res.json();
  return final_res;
}