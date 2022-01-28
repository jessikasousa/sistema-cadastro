import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "users",
  title: "Pacientes",
  subtitle: "Cadastro de Pacientes: Incluir, Listar, Alterar e Excluir!",
};

const baseUrl = "http://localhost:3001/users";
const initialState = {
  user: {
    name: "",
    birthDate: "",
    cpf: "",
    sexo: "",
    status: "",
  },
  list: [],
};

export default class UserCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                name="birthDate"
                value={this.state.user.birthDate}
                onChange={(e) => this.updateField(e)}
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>CPF</label>
              <input
                type="text"
                className="form-control"
                name="cpf"
                value={this.state.user.cpf}
                onChange={(e) => this.updateField(e)}
                placeholder="123.456.789-00"
                maxlength="14"                
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Sexo</label>
              <input
                type="text"
                className="form-control"
                name="sexo"
                value={this.state.user.sexo}
                onChange={(e) => this.updateField(e)}
                placeholder="F/M"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                className="form-control"
                name="status"
                value={this.state.user.status}
                onChange={(e) => this.updateField(e)}
                placeholder="Ativo ou Inativo"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>

            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>Sexo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.birthDate}</td>
          <td>{user.cpf}</td>
          <td>{user.sexo}</td>
          <td>{user.status}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
