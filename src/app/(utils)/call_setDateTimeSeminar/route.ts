export async function call_setDateTimeSeminar(id:string,date_time:Date) {
   
    try{
        
       
        const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/setDateTimeSeminar`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id:id,date_time:date_time}),
            
            
        })
        const final_res= await res.json()
        return final_res;
    }catch(err){
        console.log(err)
        return new Response(JSON.stringify({res:"error during setting date time seminar"}));
    }
    
 
     
   
}
