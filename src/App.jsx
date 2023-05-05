import { useState } from "react";
import "./App.css";
import VistaArticulos from "./components/Articulos/VistaArticulos";
import Header from "./views/header";
import VistaPedidos from "./components/Pedidos/VistaPedidos";

function App() {
  /*   const [count, setCount] = useState(0)


  const test = async ()=>{    
    let url = import.meta.env.VITE_API_URL

    let temp = { 
      identidad: 3,
      nombre:"lucho"
    }

    const resp = await fetch(url,{
      method: "POST",
      body: JSON.stringify(temp),
      headers:{
        'Content-Type':'application/json'
      } 
    })
    const rest = await resp.json()
    console.log(rest)
  } */

  return (
    <>
      <Header />
      <VistaArticulos />
      <VistaPedidos />
    </>
  );
}

export default App;
