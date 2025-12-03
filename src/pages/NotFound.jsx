
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="notfound-root p-5 m-5 pt-5 ">
      <div className="notfound-inner container">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-3 text-dark">Página não encontrada</h2>
        <p className="text-muted mb-4">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Ir ao início
          </button>
        </div>
      </div>
    </main>
  );
}
