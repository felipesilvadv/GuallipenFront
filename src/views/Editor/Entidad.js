import React, { Component } from 'react';
import apiUri from "../../apiUri";
import New from './New';
import Edit from './Edit';
import Delete from './Delete';

class Entidad extends Component {
  constructor(props){
    super(props);
    this.state = {coleccion: [], clientes: []};
  }
  componentDidMount(){
    fetch(apiUri + this.props.route)
    .then(r => r.json())
    .then(r => {
      this.setState({
        coleccion: r
      });
      console.log(this.state.coleccion);
    }).catch(r => {
      console.log(r);
    });
    if (this.props.route === 'pedidos'){
      fetch(apiUri + 'clientes/')
      .then(r => r.json())
      .then(r => {
        this.setState({
          clientes: r
        });
        console.log(this.state.clientes);
      }).catch(r => {
        console.log(r);
      });
    }
  }
  reload(){
    window.location.reload();
  }
  render() {
    return (
      <div className='row'>
      <div className='col'>
      <New nombre={this.props.nombre} ruta={this.props.route} datos={this.state.clientes} func={this.reload}/>
      </div>
      <div className='col'>
      <Edit nombre={this.props.nombre} ruta={this.props.route} datos={this.state.coleccion} func={this.reload}/>
      </div>
      <div className='col'>
      <Delete nombre={this.props.nombre} ruta={this.props.route} datos={this.state.coleccion} func={this.reload}/>
      </div>
      </div>
    );
  }
}
export default Entidad;
