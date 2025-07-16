export async function call_nodemailer_for_meeting_confirmation(email:string,date_time:string,expert:string) {

    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/nodemailer_for_meeting_confirmation`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"email":email,"date_time":date_time,"expert":expert})
        
        
    })
    const final_res= await res.json()
    console.log(final_res)
    return final_res;
   
}
