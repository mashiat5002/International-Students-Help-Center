export async function call_deepseek_for_application_links(type:string,university:string, title:string, deadline:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/deepseek_for_application_links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify({"type":type,"university":university,"title":title,"deadline":deadline})

  });
  const final_res = await res.json();
  return final_res;
}