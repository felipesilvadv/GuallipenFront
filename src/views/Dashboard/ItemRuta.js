import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class ItemRuta extends Component {
  render(){
    const pedido = this.props.pedido;
    const ruta = this.props.ruta;
    const display = ruta.llegada != undefined;
    return (<ListGroupItem key={ruta._id}>
      <div className="row" >
        <div className="col" >{ruta.id}</div>
        <div className="col" >{pedido.cliente}</div>
        <div className="col-3">{display && ruta.llegada}</div>
      </div>
    </ListGroupItem>);

  }
}
export default ItemRuta;
