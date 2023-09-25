import {useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';


const SavedList = () => {
    const [list,setList]=useState([])
    const [isRedirect,setRedirect]=useState(false)
    const navigate=useNavigate()

    const handleVideoPlayer=(index)=>{
        if (list.length>0){
               localStorage.removeItem("videoUrl")
                localStorage.setItem("videoUrl",list[index].videoUrl)
                 navigate("/video")
        }
    }
    useEffect( ()=>{
        const fetchAll=async ()=>{

        
         await fetch("/api/").then((response)=>response.json()).then((res)=>
        {
            setList(res)
        }).catch((err)=>console.log(err))
    }
    fetchAll()
    },[])
   
  return (<>
    <div style={{display:"flex", flexDirection:"row",flexWrap:"wrap",justifyContent:"center",padding:"2em",backgroundColor:"#e5e7eb"}}>
        <h1 >Videos List</h1>
    {list.length>0 ? list.map((eachItem,index)=><div key={index} style={{display:"flex",backgroundColor:"white",flexDirection:"column",borderRadius: "8px",boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", overflow: "hidden", margin: "20px",padding:"2em"}} onClick={()=>handleVideoPlayer(index)} >  <img src={eachItem.tumbnailUrl} style={{height:"50vh",alignSelf:"center"}}/> <h1>{eachItem.title}</h1><p>{eachItem.description}</p></div>):<h1>Empty</h1>}
    </div>
    </>
  )
}

export default SavedList
