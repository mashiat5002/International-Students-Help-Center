import extractFullJarray from "../extract_array/extract_array"


export async function call_deepseek(type:string,questions:string[],answers:string[]) {
    console.log("deepseek called")
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
        console.log("error in parsing the json object")
     return null}
        console.log("obj")
        console.log(obj)
    return JSON.parse(obj);
   
}
