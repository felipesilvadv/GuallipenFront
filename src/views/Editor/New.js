import React, { Component } from 'react';
import apiUri from "../../apiUri";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', orden: 0, estado: 0, cliente: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleChangeSelect(event){
    this.setState({cliente: event.target.value});
  }

  handleSubmit(event) {
    alert('Nombre: ' + this.state.name + '\nEmail: ' + this.state.email);
    const url = apiUri + this.props.ruta;
    const datos = this.genData(this.props.nombre);
    this.setState({name: '', email: '', orden: 0, estado: 0, cliente: ''});
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)}).then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
      });
    event.preventDefault();
  }

  genData(name){
    if (name === "Vendedor"){
      return {nombre: this.state.name, email: this.state.email};
    }
    else if (name === "Transportista"){
      return {nombre: this.state.name};
    }
    else if (name === "Pedido"){
      return {cliente: this.state.cliente, orden: this.state.orden.toString(), estado: this.state.estado};
    }
    return {};
  }

  genForm(name){
    if (name === "Vendedor"){
      return (<form onSubmit={this.handleSubmit}>
        <label>
          Nombre:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
          <br></br>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>);
    }else if( name === "Transportista"){
      return (<form onSubmit={this.handleSubmit}>
        <label>
          Nombre:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>);
    }else if (name === "Pedido") {
      return (<form onSubmit={this.handleSubmit}>
        <label>
          Cliente:
          <label>
            <select value={this.state.cliente} onChange={this.handleChangeSelect} >
            <option value=""></option>
            {this.props.datos.map((item, i) => {
              return <option key={item._id} value={item._id}>{item.nombre} </option>;
            })}
            </select>
          </label>
          <br></br>
          Estado:
          <input name="estado" type="number" value={this.state.estado} onChange={this.handleChange}/>
          <br></br>
          Orden:
          <input name="orden" type="number" value={this.state.orden} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>);
    }

  }

  render() {
    return (
      <div>
      <h3>Agregar Nuevo {this.props.nombre}</h3>
        {this.genForm(this.props.nombre)}
      </div>
    );
  }
}
export default New;
