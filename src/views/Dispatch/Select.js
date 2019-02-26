import React, { Component } from 'react';
import apiUri from "../../apiUri";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    const url = apiUri + 'vendedores';
    const datos = {id: '1', nombre: 'Vendedor 1', email: 'hola@gmail.com'};
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)}).then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
