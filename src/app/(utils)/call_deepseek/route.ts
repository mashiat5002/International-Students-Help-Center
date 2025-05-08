import extractFullJarray from "../extract_array/extract_array"


export async function call_deepseek(type:string,questions:string[],answers:string[]) {
   
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/deepseek`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"type":type,"questions":questions,"answers":answers})
        
        
    })
    const final_res= await res.json()
    console.log(final_res)
    const obj=extractFullJarray(final_res.message.choices[0].message.content)
    if(obj==null){
     return null}
     
    return JSON.parse(obj);
   
}
