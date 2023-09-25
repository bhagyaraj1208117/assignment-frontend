
import React,{useState} from 'react'

const FormPage = () => {
    const [formDetails,setFormDetails]=useState({
        title:"",
        description:"",
    })
    const [imgFile,setImgFile]=useState({
        value:"",
        file:null,
        errMsg:'Please select jpg or png formated files'
    });
    const [videoFile,setVideoFile]=useState({
        value:"",
        file:null,
        errMsg:'Please select mp4,mpg,avi formated files'
    });
    const [errTitle,setErrTitle]= useState({
        showErr:false,
        errMsg:''
    })
    const [errDescription,setErrDescription]= useState({
        showErr:false,
        errMsg:''
    })
    const handleFileChange=(e,fileType)=>{
        const selectedFile=e.target.files[0]
        if (selectedFile){
            const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
            const fileExtensionFormating=`.${fileExtension}`
            if (fileType==="img"){                
                if (fileExtensionFormating===".jpg"|| fileExtensionFormating===".png"){
                    if (selectedFile.size<=(10 * 1024 * 1024)){
                        setImgFile({
                            value:e.target.value,
                            file:selectedFile,
                            errmsg:''
                           })
                    }
                    else{
                        setImgFile({
                            value:'',
                            file:null,
                            errMsg:"File size is too large",
                        })
                    }
                  
                }
                else{
                    
                    setImgFile({
                        value:'',
                        file:null,
                        errMsg:"Please select jpg or png formated files",
                    })
                }
    
            }
            else if (fileType==="video"){
                if (fileExtensionFormating===".mpg"|| fileExtensionFormating===".avi" ||fileExtensionFormating===".mp4" ){
                    if (selectedFile.size<=100 * 1024 * 1024){
                    setVideoFile({
                        value:e.target.value,
                        file:selectedFile,
                        errmsg:''
                    })
                }
                else{
                    setVideoFile({
                        value:'',
                        file:null,
                        errMsg:"File size is too large"
                     })
                }

            }
            else{
                 setVideoFile({
                    value:'',
                    file:null,
                    errMsg:"Please select mp4,mpg,avi formated files"
                 })
            }
        }
        }
       

    }
    const handleChange=(eventValue,value)=>{
        if (value==="title"){
            if (eventValue.length>50){
                setErrTitle({
                    showErr:true,
                    errMsg:"Title should exceed 50 characters"
                })
            }
            else{
                if (errTitle.showErr){
                    setErrTitle({
                        showErr:false,
                        errMsg:''
                    })
                }
                setFormDetails((prev)=>({...prev,title:eventValue}))
            }
        }
        if (value==="description"){
            if (eventValue.length>200){
                setErrDescription({
                    showErr:true,
                    errMsg:"Description should exceed 200 characters"
                })
            }
            else{
                if (errDescription.showErr){
                    setErrDescription({
                        showErr:false,
                        errMsg:''
                    })
                }
                setFormDetails((prev)=>({...prev,description:eventValue}))
            }
        }
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        
        if (formDetails.title===""){
            setErrTitle({
                showErr:true,
                errMsg:"This field is mandatory"
            })
        }
        else if (formDetails.description===""){
            setErrDescription({
                showErr:true,
                errMsg:"This field is mandatory"
            })
        }
        else if ( imgFile.file===null){
            imgFile((prev)=>({...prev,errMsg:"his field is mandatory"}))
        }
      
        else if (videoFile.file===null){
            videoFile((prev)=>({...prev,errMsg:"his field is mandatory"}))
        }
        else{
            const preset_key="wdn0rnl0";
            const cloud_name="dlfwu43qp";
            const imgFormData =new FormData();
            const videoFormData=new FormData();
            imgFormData.append("file",imgFile.file);
            imgFormData.append("upload_preset", preset_key);
            videoFormData.append("file",videoFile.file);
            videoFormData.append("upload_preset", preset_key);
            const responseImg = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
            , {
                method: "POST",
                body: imgFormData,
              });
            
              const responseVideo = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`
              , {
                  method: "POST",
                  body: videoFormData,
                });  
           
             if (responseImg.ok && responseVideo.ok){
                const responseImgJson=await responseImg.json()
                const responseVideoJson=await responseVideo.json()

                const videoUrl=responseVideoJson.secure_url
                const thumbnailUrl=responseImgJson.secure_url;
                const requestData = {
                    title: formDetails.title,
                    description:formDetails.description,
                    tumbnailUrl: thumbnailUrl, 
                    videoUrl:videoUrl
                  };
                  
                 
                  const requestOptions = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData), 
                  };
                  fetch("/api/save", requestOptions)
                        .then((response) => {
                            if (!response.ok) {
                            throw new Error('Network response was not ok');
                            }
                            return response.json(); 
                        })
                        .then((data) => {
                           setFormDetails({
                            title:"",
                            description:""
                           })
                           setImgFile({
                            
                                value:"",
                                file:null,
                                errMsg:'Please select jpg or png formated files'
                            
                           })
                           setVideoFile({                        
                                value:"",
                                file:null,
                                errMsg:'Please select jpg or png formated files'
                           })
                           
                        })
                        .catch((error) => {
                          
                            console.error('There was a problem with the POST request:', error);
                        });
             }
        }
    }
  return (
    <div style={{backgroundColor:"#e5e7eb", height:"100vh", width:"100vw"}}> <form style={{borderStyle:"solid",borderColor:"white", display:"flex",flexDirection:"column",padding:"2em",margin:"2em",backgroundColor:"white"}} onSubmit={handleSubmit}>
        <h1 style={{textAlign:"center"}}>ADD VIDEOS</h1>
        <label htmlFor='title'>* Title</label>
        <input type="text" id="title" onChange={(e)=>handleChange(e.target.value,"title")} value={formDetails.title} style={{padding:"0.4em"}}/>
        {errTitle.showErr && <p style={{fontSize:"10px"}}>*** {errTitle.errMsg}</p>}
        <label htmlFor='description'>* Description</label>
        <textarea rows="5" id="description" onChange={(e)=>handleChange(e.target.value,"description")} value={formDetails.description} style={{padding:"0.4em"}}/>
        {errDescription.showErr && <p style={{fontSize:"10px"}}>*** {errDescription.errMsg}</p>}
        <label htmlFor='thumbnail'>* Thumbnail </label>
        <input type="file" id="thumbnail"  accept=".jpg,.png,.webp" onChange={(e)=>handleFileChange(e,"img")} value={imgFile.value}/>
        {imgFile.errMsg!=="" && <p style={{fontSize:"10px"}}>*** {imgFile.errMsg}</p>}

        <label htmlFor='video'>* Video </label>
        <input type="file" accept=".avi,.mpg,.mp4" id="video" onChange={(e)=>handleFileChange(e,"video")} value={videoFile.value}/>
        {videoFile.errMsg!=="" && <p style={{fontSize:"10px"}}>*** {videoFile.errMsg}</p>}

        <p style={{fontSize:"12px"}}>Fields which contains "*" is mandatory to fill</p>
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
         <button type="submit" style={{border:"none", padding:"0.5em", paddingLeft:"1.5em",paddingRight:"1.5em",borderRadius:"0.1em"}}>Submit</button>
        </div>
        </form></div>
  )
}
export default FormPage;
