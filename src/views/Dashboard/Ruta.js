import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import ItemRuta from './ItemRuta';

class Ruta extends Component {
  findData(id){
    for (var i = 0; i < this.props.rutas.length; i++) {
      if (this.props.rutas[i].id === id){
        return this.props.rutas[i];
      }
    }
  }
  render() {
    return (
      <ListGroup>
        <ListGroupItem active>
          <h2>{this.props.transfer.nombre}</h2>
        </ListGroupItem>
        <div style={{ overflowY: "auto", height: window.innerHeight / 2.8 }}>
          {this.props.transfer.ruta.map((item, i) => {
              const ruta = this.findData(item);
              const pedido = JSON.parse(ruta.pedido);
              return (<ItemRuta ruta={ruta} pedido={pedido} key={ruta._id}  />);
            })}
        </div>
      </ListGroup>
    );
  }
}
export default Ruta;
