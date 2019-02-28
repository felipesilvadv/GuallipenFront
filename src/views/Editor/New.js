import React, { Component } from 'react';
import apiUri from "../../apiUri";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', orden: undefined, estado: undefined, cliente: ''};

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
    alert('Creaste un '+this.props.nombre + this.mensaje());
    const url = apiUri + this.props.ruta;
    const datos = this.genData();
    this.setState({name: '', email: '', orden: 0, estado: 0, cliente: ''});
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)}).then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
      });
    event.preventDefault();
  }

  mensaje(){
    if (this.props.nombre === "Vendedor"){
      return '\nNombre: '+ this.state.name + '\nEmail: '+this.state.email;
    }
    else if (this.props.nombre === "Transportista"){
      return '\nNombre: '+ this.state.name;
    }
    else if (this.props.nombre === "Pedido"){
      let cliente = '';
      for (var i = 0; i < this.props.datos.length; i++) {
        if (this.props.datos[i]._id === this.state.cliente){
          cliente = this.props.datos[i].nombre;
          break;
        }
      }
      return '\nCliente: '+ this.state.cliente + '\nOrden : ' + this.state.orden.toString()+ '\nEstado: ' + this.state.estado;
    }
    return '';
  }
  genData(){
    if (this.props.nombre === "Vendedor"){
      return {nombre: this.state.name, email: this.state.email};
    }
    else if (this.props.nombre === "Transportista"){
      return {nombre: this.state.name};
    }
    else if (this.props.nombre === "Pedido"){
      return {cliente: this.state.cliente, orden: this.state.orden.toString(), estado: this.state.estado};
    }
    return {};
  }

  genForm(){
    if (this.props.nombre === "Vendedor"){
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
    }else if( this.props.nombre === "Transportista"){
      return (<form onSubmit={this.handleSubmit}>
        <label>
          Nombre:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>);
    }else if (this.props.nombre === "Pedido") {
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
        {this.genForm()}
      </div>
    );
  }
}
export default New;
