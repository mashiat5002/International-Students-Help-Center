

export async function call_register(fullName:string,email:string,password:string) {
   
    try{

        const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/register`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                full_name: fullName,
                password: password,
               
              }),
            
            
        })
        return res;
    }catch(err){
        console.log(err)
        //the api returns a Response type, so we need to return a Response type for consistency
        return new Response(JSON.stringify({res:"error during registration"}));
    }
    
 
     
   
}
