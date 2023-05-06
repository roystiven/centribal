import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import NuevoPedido from "./NuevoPedido";

const VistaPedidos = () => {
  const [pedidos, setPedidos] = useState();
  const [showModal, setShowModal] = useState(false);
  const [accion, setAccion] = useState("nuevo");
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState({});
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    PedidosIniciales();
  }, []);

  useEffect(() => {
    PedidosIniciales();
  }, [showModal]);

  const PedidosIniciales = async () => {
    let url = import.meta.env.VITE_API_URL_ORDERS;
    const resp = await fetch(url);
    const rest = await resp.json();
    setPedidos(rest);

    url = import.meta.env.VITE_API_URL_PRODUCTS;
    const resp2 = await fetch(url);
    const rest2 = await resp2.json();
    setProductos(rest2);

    let pedidos = rest.map((dat) => {
      let valor_con_imp = 0;
      let valor_sin_imp = 0;
      let temp3 = dat.articulos.map((art) => {
        let temp = rest2.filter(
          (fil) => parseInt(art.id_articulo) === parseInt(fil.id)
        );
        let precio = parseFloat(temp[0].precio);
        let impuesto = parseFloat(temp[0].impuesto);

        let valor_con_imp2 =
          parseFloat(art.cantidad) * precio * (1 + impuesto / 100);
        let valor_sin_imp2 = parseFloat(art.cantidad) * precio;

        valor_con_imp += valor_con_imp2;
        valor_sin_imp += valor_sin_imp2;
        return {
          ...art,
          precio: precio,
          impuesto: impuesto,
          referencia: temp[0].referencia,
        };
      });

      return {
        articulos: temp3,
        id: dat.id,
        valor_con: valor_con_imp,
        valor_sin: valor_sin_imp,
      };
    });
    setPedidos(pedidos);
  };

  const HandleEditar = (pedido) => {
    setPedidoSeleccionado(pedido);
    setAccion("editar");
    setShowModal(true);
  };

  const HandleAbrir = () => {
    setAccion("nuevo");
    setShowModal(true);
  };

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  return (
    <div className="p-4 max-ancho">
      <a href="/" className="atras">
        {"<"}Atras
      </a>
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
            {pedidos?.map((dat) => (
              <tr key={dat.id}>
                <td onClick={() => HandleEditar(dat)} className="ver_item">
                  {dat.id}
                </td>
                <td>{formatter.format(dat.valor_sin)}</td>
                <td>{formatter.format(dat.valor_con)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NuevoPedido
        showModal={showModal}
        setShowModal={setShowModal}
        accion={accion}
        pedidoSeleccionado={pedidoSeleccionado}
        setPedidoSeleccionado={setPedidoSeleccionado}
        productos={productos}
      />
    </div>
  );
};

export default VistaPedidos;
