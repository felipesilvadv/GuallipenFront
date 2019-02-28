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
    const confirmo = confirm("id: " + this.state.value);
    if (confirmo){
      const url = apiUri + this.props.ruta + '/' + this.state.value;
      fetch(url , {method: 'DELETE', mode: 'cors', headers: {'Content-Type': 'application/json'}})
      .then(function(response) {
          return response;
        }).then(function(body) {
          console.log(body);
        });
      this.setState({value: ''});
    }
    event.preventDefault();
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
