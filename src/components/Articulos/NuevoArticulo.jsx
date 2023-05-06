import React, { useEffect, useState } from "react";
import "./styles.css";

const NuevoArticulo = ({
  showModal,
  setShowModal,
  accion,
  articuloSeleccionado,
  setArticuloSeleccionado,
}) => {
  const [articulo, setArticulo] = useState({
    referencia: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    impuesto: 0,
  });

  useEffect(() => {
    if (accion === "editar") {
      setArticulo(articuloSeleccionado);
    } else {
      setArticulo({
        referencia: "",
        nombre: "",
        descripcion: "",
        precio: "",
        impuesto: "",
      });
    }
  }, [accion, showModal]);

  const HandleEnviar = async () => {
    let url = import.meta.env.VITE_API_URL_PRODUCTS;
    if (accion === "editar") {
      const resp = await fetch(url + "/" + articuloSeleccionado.id, {
        method: "PUT",
        body: JSON.stringify(articulo),
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
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(articulo),
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

  if (showModal === true) {
    return (
      <div className="o_modal">
        <div className="o_modal_body">
          <h2>
            {accion !== "editar"
              ? "Creación de nuevo producto"
              : "Edición de producto"}
          </h2>
          <div className="form-group w-100">
            <label>Referencia</label>
            <input
              type="text"
              className="form-control"
              placeholder="Referencia"
              name="referencia"
              value={articulo.referencia}
              onChange={(e) =>
                setArticulo({ ...articulo, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group w-100">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="nombre"
              value={articulo.nombre}
              onChange={(e) =>
                setArticulo({ ...articulo, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group w-100">
            <label>Descripcion</label>
            <input
              type="text"
              className="form-control"
              placeholder="Descripcion"
              name="descripcion"
              value={articulo.descripcion}
              onChange={(e) =>
                setArticulo({ ...articulo, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group w-100">
            <label>Precio</label>
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              name="precio"
              value={articulo.precio}
              onChange={(e) =>
                setArticulo({ ...articulo, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group w-100">
            <label>Impuesto</label>
            <input
              type="number"
              className="form-control"
              placeholder="Impuesto"
              name="impuesto"
              value={articulo.impuesto}
              onChange={(e) =>
                setArticulo({ ...articulo, [e.target.name]: e.target.value })
              }
            />
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

export default NuevoArticulo;
