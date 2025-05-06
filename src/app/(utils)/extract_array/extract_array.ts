function extractFullJarray(str:string) {
    const start = str.indexOf('[');
    const end = str.lastIndexOf(']');
  
    if (start === -1 || end === -1 || end <= start) {
      return null; // invalid structure
    }
    
    return str.slice(start, end + 1);
  }
  export default extractFullJarray;