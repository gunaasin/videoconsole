import React from 'react'
import CodeEditor from "./components/CodeEditor";

export const Frame = () => {
 
  console.log("Windo Location:" , window.location);
  const key = window.location.search;
  const urlParam = new URLSearchParams(key);
  const finalurl =urlParam.get('url');
  console.log(finalurl)

  return (
    <div className='framebox'>
      <div className="topbox">
      <div className="video">
      <iframe width="871" height="500" src={finalurl} title="APIs Explained (in 4 Minutes)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
     

      <div className='compiler'> 
      <CodeEditor />
      </div>
       
    </div>
  )
}
