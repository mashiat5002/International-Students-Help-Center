const  timeFormatConverter=(date:string)=> {
  console.log(date)
     const newDate=new Date(
                            date.toString()
                          ).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })
                        
                        return newDate;}
                        
export default timeFormatConverter;