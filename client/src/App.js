import "./App.css"
import { useState } from "react";

function App() {
  const [ data, setData ] = useState(
    {
      url:"",
      price:"",
      category:""
    }
  )
  const handleinput = (e) =>{
    const text = e.target.value
    const name = e.target.name
    setData({...data, [name]:text})
  }
  const handlesubmit =async (e)=>{
    e.preventDefault();
    const {url, price, category} = data;
    const res = await fetch("/generate", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            url, price, category
        })     
    })
    const datanew = await res.json();
    console.log(datanew)
  }
  console.log(data)
  return (
    <>
      <div className="mainpageContainer">
        <form>
          <div className="formContainer">
            <input type="text" name="url" onChange={handleinput} placeholder="Enter image url" required />
            <input type="number" name="price" onChange={handleinput} placeholder="Enter price" required />
            <input type="text" name="category" onChange={handleinput} placeholder="Enter category" required />
            <button onClick={handlesubmit}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
