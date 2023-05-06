import React from 'react'
import "./Styles.css"

const Home = () => {
  return (
    <div className='container_home'>
        <button className='link link_articulos'>
            <a href="/articulos">VER ARTICULOS </a>
            
        </button>

        <button className='link link_pedidos'>
         <a href="/pedidos">VER PEDIDOS </a>
        </button>
    </div>
  )
}

export default Home