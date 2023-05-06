import React, { useEffect, useState } from "react";
import "./styles.css";

const NuevoPedido = ({ showModal, setShowModal, accion, pedidoSeleccionado, setPedidoSeleccionado, productos }) => {

  const [nuevoArticulo, setNuevoArticulo] = useState({
    cantidad: 0,
    id_articulo:0
   } )

  const [articulo, setArticulo] = useState({
    id: "",
    valor_con: "",
    valor_sin: "",
    articulos: [{}]
  });

  useEffect(() => {
    if (accion === "editar") {
        setArticulo(pedidoSeleccionado)
    }else{
        setArticulo({
          id: "",
          valor_con: "",
          valor_sin: "",
          articulos: []
          });
    }

  }, [accion, showModal]);

  const HandleEnviar = async () => {


    let url = "http://localhost:3000/pedidos";
    if (accion === "editar") {
      let data = {
        id:pedidoSeleccionado.id,
        articulos:articulo.articulos
      }

        const resp = await fetch(url+"/"+data.id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const rest = await resp.json();
          if (rest.id) {
            setArticulo({
              referencia: "",
              nombre: "",
              descripcion: "",
              precio: "",
              impuesto: "",
            });
            setShowModal(false);
          }

    } else {
      let data = {
        articulos:articulo.articulos
      }

      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const rest = await resp.json();
      if (rest.id) {
        setArticulo({
          referencia: "",
          nombre: "",
          descripcion: "",
          precio: "",
          impuesto: "",
        });
        setShowModal(false);
      } 
    }
  };
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  const eliminarArticulo = (id) =>{
    let temp = articulo.articulos.filter(fil => fil.id !==id)
    let valor_con_imp = 0
    let valor_sin_imp = 0
    temp.map(art=>{
      let valor_con_imp2 =  parseFloat(art.cantidad) * art.precio * (1+(art.impuesto/100))
      let valor_sin_imp2 = parseFloat(art.cantidad) * art.precio
      valor_con_imp += valor_con_imp2
      valor_sin_imp += valor_sin_imp2
    })
    setArticulo({...articulo, articulos:temp, valor_con:valor_con_imp, valor_sin: valor_sin_imp})
  }


  const editarArticulo=(value, id)=>{
    let temp = articulo.articulos.filter(fil => fil.id ===id)
    temp = {...temp[0], cantidad:parseInt(value), }
 
        let articulos_temp = articulo.articulos.map(art=>{
          if(art.id===id){
            return temp
          }else{
            return art
          }
        })

    let valor_con_imp = 0
    let valor_sin_imp = 0
    articulos_temp.forEach(dat=>{
      let valor_con_imp2 =  parseFloat(dat.cantidad) * dat.precio * (1+(dat.impuesto/100))
      let valor_sin_imp2 = parseFloat(dat.cantidad) * dat.precio

      valor_con_imp += valor_con_imp2
      valor_sin_imp += valor_sin_imp2
    })
    setArticulo({...articulo, articulos:articulos_temp, valor_con:valor_con_imp, valor_sin:valor_sin_imp})
  }


  const nuevoproducto=()=>{
    let temp = productos.filter(fil => parseInt(fil.id) === parseInt(nuevoArticulo.id_articulo))
    let nuevo_articulo = { 
      cantidad:parseInt(nuevoArticulo.cantidad), 
      id:articulo.articulos.length+1, 
      id_articulo: nuevoArticulo.id_articulo,
      impuesto: parseFloat(temp[0].impuesto),
      precio: parseFloat(temp[0].precio),
      referencia:temp[0].referencia
    }


    let valor_con_imp = 0
    let valor_sin_imp = 0
    articulo.articulos.forEach(dat=>{
      let valor_con_imp2 =  parseFloat(dat.cantidad) * parseFloat(dat.precio) * (1+(dat.impuesto/100))
      let valor_sin_imp2 = parseFloat(dat.cantidad) * parseFloat(dat.precio)
      valor_con_imp += valor_con_imp2
      valor_sin_imp += valor_sin_imp2
    })

    valor_con_imp += parseFloat(nuevo_articulo.cantidad) * parseFloat(nuevo_articulo.precio) * (1+ (nuevo_articulo.impuesto/100))
    valor_sin_imp += parseFloat(nuevo_articulo.precio) * parseFloat(nuevo_articulo.cantidad)
    setArticulo({...articulo, articulos:[...articulo.articulos, nuevo_articulo], valor_con:valor_con_imp, valor_sin:valor_sin_imp})
  }
  
  if (showModal === true) {
    return (
      <div className="o_modal">
        <div className="o_modal_body">
          <h2>{accion !== "editar" ? "Creación de nuevo pedido" : "Edición de pedido"}</h2>
          {accion==="editar" &&
          <div className="form-group w-100">
            <label>Numero de Pedido</label>
            <p>{articulo.id}</p> 
          </div>
          }

          <div className="w-100">
              <h5>Añadir articulos</h5>
              <div className="contenedor_nuevo">
                <select  className="form-select" name="id_articulo" onChange={(e)=>setNuevoArticulo({...nuevoArticulo, [e.target.name]:e.target.value})}>
                  <option value="">Seleccione</option>
                  {productos.map(dat=>
                    <option value={dat.id}>{dat.referencia}</option>
                    )}
                </select>
                <input className="form-control" type="number" placeholder="Cantidad" name="cantidad" onChange={(e)=>setNuevoArticulo({...nuevoArticulo, [e.target.name]:e.target.value})}/> 
                <button className="btn btn-success" onClick={()=>nuevoproducto()} >Agregar</button>
              </div>
             
          </div>
         
        
          <div className="w-100">
            <h5 className="mb-3">Articulos añadidos</h5>
            <div className="items_agregados">
              {articulo.articulos.map((dat,index)=>
                 <div className="container_articulos" key={"articulos"+index}>
                    <p>{dat.referencia}</p>
                    <div className="contenedor_cantidad">
                      <input lass="form-control" type="number" name={"cantidad_"+dat.id} value={dat.cantidad} onChange={(e)=>editarArticulo(e.target.value, dat.id)}/> 
                      <div className="modificar"></div>
                    </div>
                    
                    <p>{formatter.format(dat.precio*dat.cantidad)}</p>
                    <div>
                    <button className="eliminar" onClick={()=>eliminarArticulo(dat.id)}>Eli</button>
                    </div>
                 </div>
                 
                )}
            </div>
          </div>
          

       

          <div className="form-group w-100 text-left">
            <label className="text-right w-100">Valor total sin impuesto</label>
            <p className="text-right">{formatter.format(articulo.valor_sin)}</p> 
          </div>
          <div className="form-group w-100 text-left">
            <label className="text-right w-100">Valor total con impuesto</label>
            <p className="text-right">{formatter.format(articulo.valor_con)}</p> 
          </div>
          

          <div className="container_button">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={() => HandleEnviar()}
            >
              {accion !== "editar" ? "Guardar" : "Modificar"}
            </button>

            
          </div>
          
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default NuevoPedido;
