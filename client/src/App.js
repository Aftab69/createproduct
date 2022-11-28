import "./App.css"
import { useState } from "react";

function App() {
  const [ data, setData ] = useState(
    {
      image:"",
      name:"",
      price:"",
      category:"",
      amount:"1",
      quantity:""
    }
  )
  const handleinput = (e) =>{
    const text = e.target.value
    const name = e.target.name
    setData({...data, [name]:text})
  }
  const handlesubmit =async (e)=>{
    e.preventDefault();
    const {image, name, price, category, amount, quantity} = data;
    const res = await fetch("/generate", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            image, name, price, category, amount, quantity
        })     
    })
    // eslint-disable-next-line
    const datanew = await res.json();
    if(res.status===201){
      window.alert("product added")
      document.querySelectorAll("input").forEach(
        input => (input.value = "")
      );
    } else {
      window.alert("error")
    }
  }
  console.log(data)
  return (
    <>
      <div className="mainpageContainer">
        <form>
          <div className="formContainer">
            <input type="text" name="image" onChange={handleinput} placeholder="Enter Image Url" required />
            <input type="text" name="name" onChange={handleinput} placeholder="Enter Product Name" required />
            <input type="number" name="price" onChange={handleinput} placeholder="Enter Product Price" required />
            <input type="text" name="category" onChange={handleinput} placeholder="Enter Product Category" required />
            <input type="number" name="quantity" onChange={handleinput} placeholder="Enter Product Quantity" required />
            <button onClick={handlesubmit}>Submit</button>
          </div>
        </form>
      </div>
      <div className="productsviewContainer">
        
      </div>
    </>
  );
}

export default App;
