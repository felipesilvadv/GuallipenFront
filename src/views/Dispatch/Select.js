import React, { Component } from 'react';
import apiUri from "../../apiUri";
import { ListGroup, ListGroupItem } from "reactstrap";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', number: '', isAlive: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});

  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    let url = apiUri + 'rutas/';
    let datos = {id: this.state.number.toString(), pedido: JSON.stringify(this.props.pedido)};
    // Generar Ruta
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)}).then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
      });
    url = apiUri + 'transportistas/' + this.state.value;
    const numero = this.state.number.toString();

    // Actualizar Transportista
    let rutas =[];
    for (var i = 0; i < this.props.transportistas.length; i++) {
      if (this.props.transportistas[i]._id  === this.state.value){
        rutas = this.props.transportistas[i].ruta;
        break;
      }
    }
    rutas.push(numero);
    console.log(rutas);
    fetch(url, {method: 'PUT', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ruta: rutas})})
    .then(function(response){
      return response.json()
    }).then(function(body){
      console.log(body);
    });

    // "Borrar" pedido
    url = apiUri + 'pedidos/' + this.props.pedido._id;
    fetch(url , {method: 'PUT', mode: 'cors', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({estado: -1})})
    .then(function(response) {
        return response;
      }).then(function(body) {
        console.log(body);
      });
    this.setState({value: '', number: '', isAlive: false})
    event.preventDefault();
  }
  updateNumber(event){
    this.setState({number: event.target.value});
  }
  render() {
    if (this.props.transportistas && this.state.isAlive)
    return (
      <ListGroupItem>
      <form onSubmit={this.handleSubmit}>
        <div className="row">
        <div className="col">
        <font size="3"><b>Seleccione Transportista</b></font>
        <br></br>
          {this.props.pedido.orden + ' '+this.props.pedido.cliente + ' '}
          <select value={this.state.value} onChange={this.handleChange}>
          <option value=""> </option>
            {this.props.transportistas.map((transportista, j) => {
              return <option key={transportista._id} value={transportista._id}>{transportista.nombre} </option>;
            })}
          </select>
          </div>
          <div className="col">
          <b>Número de factura:</b>
          <br></br>
          <input type="number" name="number" value={this.state.number} onChange={this.updateNumber}/>
        <input type="submit" value="Asignar" />
        </div>
        </div>
      </form>
      </ListGroupItem>
    );
    return <ListGroupItem />;
  }
}
export default Select;
