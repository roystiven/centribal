import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import NuevoPedido from "./NuevoPedido";

const VistaPedidos = () => {
  const [articulos, setArticulos] = useState();
  const [showModal, setShowModal] = useState(false);
  const [accion, setAccion] = useState("nuevo");
  const [articuloSeleccionado, setArticuloSeleccionado] = useState({});

  useEffect(() => {
    ArticulosIniciales();
  }, []);

  useEffect(() => {
    ArticulosIniciales();
  }, [showModal]);

  const ArticulosIniciales = async () => {
    let url = import.meta.env.VITE_API_URL_ORDERS;
    const resp = await fetch(url);
    const rest = await resp.json();
    console.log(rest);
    setArticulos(rest);
  };

  const HandleEditar = (articulo) => {
    // let articulo_select = articulos.filter(dat=> dat.id ===id_articulo) */
    setArticuloSeleccionado(articulo);
    setAccion("editar");
    setShowModal(true);
  };

  const HandleAbrir = () => {
    setAccion("nuevo");
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="">VISTA DE PEDIDOS</h1>
      <div className="mt-5">
        <button
          type="button"
          className="btn btn-warning mb-2"
          onClick={() => HandleAbrir()}
        >
          Nuevo Pedido
        </button>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">NO. PEDIDO</th>
              <th scope="col">PRECIO SIN IMPUESTOS</th>
              <th scope="col">PRECIO CON IMPUESTOS</th>
            </tr>
          </thead>
          <tbody>
            {articulos?.map((dat) => (
              <tr key={dat.id}>
                <td onClick={() => HandleEditar(dat)}>{dat.id}</td>
                <td>{dat.nombre}</td>
                <td>{dat.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NuevoPedido
        showModal={showModal}
        setShowModal={setShowModal}
        accion={accion}
        articuloSeleccionado={articuloSeleccionado}
        setArticuloSeleccionado={setArticuloSeleccionado}
      />
    </div>
  );
};

export default VistaPedidos;
