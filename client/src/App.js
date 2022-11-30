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

  //for updating products
  const [ receiveddata, setReceiveddata ] = useState([])
  const [ searchdata, setSearchdata] = useState({
    searchname:""
  })
  const [ productvisibility, setProductvisibility ] = useState({display:"none"})
  const handlesearchinput = (e) =>{
    const txt = e.target.value
    const nme = e.target.name
    setSearchdata({...searchdata, [nme]:txt})
  }
  console.log(searchdata)
  const handlesearchsubmit = async(e) =>{
    e.preventDefault();
    const { searchname } = searchdata;
    const response = await fetch("/search",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        searchname
      })
    })
    const newdata = await response.json();
    if(response.status===200){
      setProductvisibility({display:"flex"})
      setReceiveddata(newdata) 
    } else if(response.status===400){
      setProductvisibility({display:"none"})
    }
  }
  console.log(receiveddata)
  const handlesearchdelete = async(e) =>{
    e.preventDefault();
    const { name } = receiveddata;
    const res = await fetch("/delete", {
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify({
          name
      })     
  })
  if(res.status===200){
    window.alert("Product Deleted Successfully")
    setProductvisibility({display:"none"})
  }
  } 

  return (
    <>
      <div className="mainpageContainer">
        <form>
          <div className="formContainer">
            <input type="text" name="image" onChange={handleinput} placeholder="Enter Image Url" required />
            <input type="text" name="name" onChange={handleinput} placeholder="Enter Product Name (In Capitals)" required />
            <input type="number" name="price" onChange={handleinput} placeholder="Enter Product Price" required />
            <div className="radioContainer">
              <div className="radioDivision"><input type="radio" name="category" value="earrings" onChange={handleinput} /><span>earrings</span></div>
              <div className="radioDivision"><input type="radio" name="category" value="keyrings" onChange={handleinput} /><span>keyrings</span></div>
              <div className="radioDivision"><input type="radio" name="category" value="fabric jewellery" onChange={handleinput} /><span>fabric jewellery</span></div>
              <div className="radioDivision"><input type="radio" name="category" value="necklaces" onChange={handleinput} /><span>necklaces</span></div>
              <div className="radioDivision"><input type="radio" name="category" value="accessories" onChange={handleinput} /><span>accessories</span></div>
              <div className="radioDivision"><input type="radio" name="category" value="jewellery set" onChange={handleinput} /><span>jewellery set</span></div>
              <div className="radioDivision"><input type="radio" name="category" value="phonecharms" onChange={handleinput} /><span>phonecharms</span></div>
            </div>
            <input type="number" name="quantity" onChange={handleinput} placeholder="Enter Product Quantity" required />
            <button onClick={handlesubmit}>Submit</button>
          </div>
        </form>
      </div>
      <div className="productsviewContainer">
        <div className="searchBox">
          <input name="searchname" onChange={handlesearchinput} placeholder="Enter Product Name"/>
          <button onClick={handlesearchsubmit}>Search</button>
        </div>
        <div style={productvisibility} className="productdetailsContainer">
          <p>image: {receiveddata.image}</p>
          <p>name: {receiveddata.name}</p>
          <p>price: {receiveddata.price}</p>
          <p>category: {receiveddata.category}</p>
          <p>quantity: {receiveddata.quantity}</p>
          <button onClick={handlesearchdelete}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default App;
