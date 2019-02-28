import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
const moment = require("moment");
class Elemento extends Component {

  render() {
    return(
      <ListGroupItem key={this.props.dato.id} >
        <div className="row">
          <div className="col-1">{this.props.dato.orden}</div>
          <div className="col">{this.props.dato.cliente}</div>
          <div className="col-3">
            {moment(this.props.dato.updatedAt).format("HH:mm")}
          </div>
        </div>
      </ListGroupItem>
  );
  }
}

export default Elemento;
