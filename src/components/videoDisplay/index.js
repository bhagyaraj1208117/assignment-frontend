import React from 'react'


function VideoPage() {
    const url=localStorage.getItem("videoUrl")
    const extension = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
    console.log(url)
    console.log(extension)

  return (
    <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"column",justifyContent:"center"}}>
    <video autoPlay controls width="400" height="300" style={{height:"100vh",width:"100vw"}}>

      <source key={url} src={`${url}`} type={`video/${extension}`} />
   
    Your browser does not support the video tag.
  </video>
  </div>
  )
}

export default VideoPage