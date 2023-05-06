import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VistaArticulos from "./components/Articulos/VistaArticulos";
import Header from "./views/header";
import VistaPedidos from "./components/Pedidos/VistaPedidos";
import Home from "./views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
/*     childrem: [
      {
        path: "/articulos",
        element: <VistaArticulos />,
      },
    ], */
  },
  {
    path: "/articulos",
    element: <VistaArticulos />,
  },
  {
    path: "/pedidos",
    element: <VistaPedidos />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header></Header>
    <RouterProvider router={router} />
  </React.StrictMode>
);
