


export async function call_nodemailer(email:string,key:string) {
    console.log("nodemailer called")
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/nodemailer`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"email":email,"key":key})
        
        
    })
    const final_res= await res.json()
    console.log(final_res)
    return final_res;
   
}
