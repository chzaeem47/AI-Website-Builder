const extractJson = async(text)=>{

    if(!text){
        return
    }

    const cleaned = text.replace(/```json/gi,"")
    .replace(/```/g,"").trim();

    const firstBracket = cleaned.indexOf('{')
    const closeBracket = cleaned.lastIndexOf('}')

    if(firstBracket===-1 || closeBracket==-1){
        return null
    }

    const jsonString = cleaned.slice(firstBracket,closeBracket+1)
    return JSON.parse(jsonString)

}

export default extractJson