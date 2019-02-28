import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Select from './Select';
import apiUri from "../../apiUri";

class Dispatch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(apiUri + "facturados")
        .then(r => r.json())
        .then(r => {
          this.setState({
            facturados: r
          });
          console.log(this.state.facturados);
        }).catch(r => {
          console.log(r);
        });
    fetch(apiUri + "transportistas")
      .then(r => r.json())
      .then(r => {
        this.setState({
          transportistas: r
        });
      }).catch(r => {
        console.log(r);
      });
  }

  render() {
    const lista = ["Hola", "Chao"];
    const pedido = {"_id":"5b6d0f2e7b84820004534f37","id":"4866","cliente":"Marinetti","estado":680,"orden":"655","transportista":"Luis","createdAt":"2018-08-10T04:06:06.543Z","updatedAt":"2018-08-10T04:06:06.543Z","__v":0};
    if (this.state.facturados && this.state.transportistas)
    return (
      <ListGroup>
      <ListGroupItem active>
      <h2> Despacho Pedidos</h2>
      </ListGroupItem>
      {this.state.facturados.map((item, i) =>{
        return (<Select transportistas={this.state.transportistas} pedido={item} key={item._id} />);
      })}
      </ListGroup>
    );
    return <h1> Recarga la página </h1>;
  }
}

export default Dispatch;
