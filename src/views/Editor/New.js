import React, { Component } from 'react';
import apiUri from "../../apiUri";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', orden: '', estado: '', cliente: '',
    patente: '', clientes: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeSelectMultiple = this.handleChangeSelectMultiple.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleChangeSelect(event){
    this.setState({cliente: event.target.value});
  }

  handleChangeSelectMultiple(event){
      /*const index = this.state.clientes.indexOf(event.target.value);
      console.log(index);
      if (index > -1){
        if (this.state.clientes.length > 1){
          const result = this.state.clientes.filter( item => item != event.target.value);
          this.setState({clientes: result});
        }else{
          this.setState({clientes: []})
        }

      }else{
        this.state.clientes.push(event.target.value);
      }*/
      let newVal = event.target.value
    let stateVal = this.state.clientes

    console.log(stateVal)
    console.log(newVal)

    stateVal.indexOf(newVal) === -1
      ? stateVal.push(newVal)
      : stateVal.length === 1
        ? (stateVal = [])
        : stateVal.splice(stateVal.indexOf(newVal), 1)

    this.setState({ clientes: stateVal })

  }

  handleSubmit(event) {
    alert('Creaste un '+this.props.nombre + this.mensaje());
    const url = apiUri + this.props.ruta;
    const datos = this.genData();
    this.setState({name: '', email: '', orden: '', estado: '', cliente: '', clientes: []});
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)}).then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
        if (this.props.nombre === 'Vendedor'){
          for (var i = 0; i < this.state.clientes.length; i++) {
            fetch(apiUri + this.props.ruta + this.state.clientes[i],
            {
              method: 'PUT', headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({vendedor: body._id})
            }).then(function(response1){
              return response1.json()
            }).then(function(body1){
              console.log(body1);
            });
          }
        }
      });
    event.preventDefault();
  }

  mensaje(){
    if (this.props.nombre === "Vendedor"){
      return '\nNombre: '+ this.state.name + '\nEmail: '+this.state.email;
    }
    else if (this.props.nombre === "Transportista"){
      return '\nNombre: '+ this.state.name +'\nPatente: '+ this.state.patente;
    }
    else if (this.props.nombre === "Pedido"){
      let cliente = '';
      for (var i = 0; i < this.props.datos.length; i++) {
        if (this.props.datos[i]._id === this.state.cliente){
          cliente = this.props.datos[i].nombre;
          break;
        }
      }
      return '\nCliente: '+ cliente + '\nOrden : ' + this.state.orden.toString()+ '\nEstado: ' + this.state.estado;
    }
    return '';
  }
  genData(){
    if (this.props.nombre === "Vendedor"){
      return {nombre: this.state.name, email: this.state.email};
    }
    else if (this.props.nombre === "Transportista"){
      return {nombre: this.state.name, id: this.state.patente};
    }
    else if (this.props.nombre === "Pedido"){
      return {cliente: this.state.cliente, orden: this.state.orden.toString(), estado: this.state.estado};
    }
    return {};
  }

  genForm(){
    if (this.props.nombre === "Vendedor"){
      const clientesDisponibles = this.props.datos.filter(item => item.vendedor === undefined);
      return (<form onSubmit={this.handleSubmit}>
      <div className="col">
        <div className="row-3">
          Nombre:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div className="row-3">
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
        </div>
        <br></br>
        <div className="row">
          Clientes:
            <select value={this.state.clientes} onChange={this.handleChangeSelectMultiple} multiple={true} >
            {clientesDisponibles.map((item, i) => {
              return <option key={item._id} value={item._id}>{item.nombre} </option>;
            })}
            </select>
        </div>
      </div>

        <input type="submit" value="Submit" />
      </form>);
    }else if( this.props.nombre === "Transportista"){
      return (<form onSubmit={this.handleSubmit}>
        <label>
          Nombre:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
          Patente:
          <input name="patente" type="text" value={this.state.patente} onChange={this.handleChange}/>
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
