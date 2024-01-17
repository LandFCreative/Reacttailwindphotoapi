

import React, { useState, useEffect } from "react";
import './App.css';
import Imagecard from "./components/Imagecard"
import Imagesearch from "./components/Imagesearch"

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState (true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`)
    .then (res => res.json())
    .then(data => {
      setImages(data.hits)
      setIsLoading(false)
    })
    .catch(err=> console.log(err));
  }, [term])
  return (
<div className="container mx-auto">
  <Imagesearch searchText={(text) => setTerm(text)}/>
  {!isLoading && images.length === 0 && <h1 className=" text-5xl text-center mx-auto mt-32">No Images Found</h1>}
  {isLoading? <h1 className=" text-6xl text-center mx-auto mt-32">Loading...</h1>: <div className ="grid grid-cols-3 gap-4">
    {images.map(image =>(
      <Imagecard key={image.id} image={image} />
    ))}
  </div>}
  </div>
  )
}

export default App;