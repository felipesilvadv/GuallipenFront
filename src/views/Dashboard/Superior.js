import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Elemento from './Elemento';
var moment = require("moment");

class Superior extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem active>
          <h2>{this.props.title}</h2>
        </ListGroupItem>
        <div style={{ overflowY: "auto", height: window.innerHeight / 2.8 }}>
          {this.props.data.map((item, i) => {
            return (
              < Elemento dato={item} key={item._id} />
            );
          })}
        </div>
      </ListGroup>
    );
  }
}
export default Superior;
