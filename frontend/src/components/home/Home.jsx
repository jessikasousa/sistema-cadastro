import React from "react";
import Main from "../template/Main";

export default (props) => (
  <Main icon="home" title="Início" subtitle="Desafio Tech - Front End">
    <div className="display-4">Bem Vinda(o)!</div>
    <hr />
    <p className="mb-0">
      <h2>CADASTRO DE PACIENTES</h2>
      A clínica ACME deseja ter uma solução web
      para consultar e cadastrar seus pacientes. O cadastro de um paciente deve
      possuir as seguintes informações:
      <ul>
        <li>Nome (obrigatório)</li>
        <li>Data nascimento (obrigatório)</li>
        <li>CPF (obrigatório)</li>
        <li>Sexo (obrigatório)</li>
        <li>Endereço (opcional)</li>
        <li>Status (obrigatório – Ativo/Inativo)</li>
      </ul>
    </p>
  </Main>
);
