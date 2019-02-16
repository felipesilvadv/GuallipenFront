import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
const moment = require("moment");
class Elemento extends Component {

  render() {
    return(
    <div>
      <ListGroupItem key={this.props.dato.id}>
        <div className="row">
          <div className="col">{this.props.dato.cliente}</div>
          <div className="col-2">
            {moment(this.props.dato.updatedAt).format("HH:mm")}
          </div>
        </div>
      </ListGroupItem>
    </div>
  );
  }
}

export default Elemento;
