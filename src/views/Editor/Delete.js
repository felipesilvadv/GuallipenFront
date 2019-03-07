import React, { Component } from 'react';
import apiUri from "../../apiUri";

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const confirmo = confirm('¿Estas seguro que quieres eliminar?\n'+this.mensaje());
    if (confirmo){
      const url = apiUri + this.props.ruta + '/' + this.state.value;
      const funcion = this.props.func;
      fetch(url , {method: 'DELETE', mode: 'cors', headers: {'Content-Type': 'application/json'}})
      .then(function(response) {
          return response;
        }).then(function(body) {
          console.log(body);
          funcion();
        });
      this.setState({value: ''});
    }
    event.preventDefault();
  }
  mensaje(){
    if (this.props.nombre === "Vendedor"){
      let nombre = '';
      let email = '';
      for (var i = 0; i < this.props.datos.length; i++) {
        if (this.props.datos[i]._id === this.state.value){
          const dato = this.props.datos[i];
          nombre = dato.nombre;
          email = dato.email;
          break;
        }
      }
      return '\n\tNombre: '+ nombre + '\n\tEmail: '+email;
    }
    else if (this.props.nombre === "Transportista"){
      let nombre = '';
      for (var i = 0; i < this.props.datos.length; i++) {
        if (this.props.datos[i]._id === this.state.value){
          const dato = this.props.datos[i];
          nombre = dato.nombre;
          break;
        }
      }
      return '\n\tNombre: '+ nombre;
    }
    else if (this.props.nombre === "Pedido"){
      let orden = '';
      let estado = '';
      for (var i = 0; i < this.props.datos.length; i++) {
        if (this.props.datos[i]._id === this.state.value){
          const dato = this.props.datos[i];
          orden = dato.orden;
          estado = dato.estado;
          break;
        }
      }
      return '\n\tOrden : ' + orden+ '\n\tEstado: ' + estado;
    }
    return '';
  }

  render() {
    return (
      <div>
      <h3> Eliminar {this.props.nombre} </h3>
      <div className='row'>
      <div className='col'>
      <form onSubmit={this.handleSubmit}>
        <label>
          <select value={this.state.value} onChange={this.handleChange} >
          <option value=""></option>
          {this.props.datos.map((item, i) => {
            if (this.props.nombre != 'Pedido'){
                return <option key={item._id} value={item._id}>{item.nombre} </option>;
            }else{
              return <option key={item._id} value={item._id}>{item.orden} </option>;
            }

          })}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      </div>
      </div>
    );
  }
}
export default Delete;
