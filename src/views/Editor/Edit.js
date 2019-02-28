import React, { Component } from 'react';
import apiUri from "../../apiUri";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', value: '', display: false, estado: 0};

    this.handleChangeEditor = this.handleChangeEditor.bind(this);
    this.handleSubmitEditor = this.handleSubmitEditor.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleSubmitSelect = this.handleSubmitSelect.bind(this);
  }

  handleChangeEditor(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleChangeSelect(event) {
    this.setState({value: event.target.value});
  }
  handleSubmitEditor(event) {
    alert('Editaste el '+ this.props.nombre + '\nNuevo ' + this.props.nombre + ':' + this.mensaje());
    this.setState({name: '', email: '', display:false});
    const url = apiUri + this.props.ruta + '/' + this.state.value;
    const datos = this.genData();
    fetch(url , {method: 'PUT', mode: 'cors', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)}).then(function(response) {
        return response;
      }).then(function(body) {
        console.log(body);
      });
      this.setState({value: ''});
    event.preventDefault();
  }
  handleSubmitSelect(event) {
    for (let i = 0; i < this.props.datos.length; i++) {
      if (this.props.datos[i]._id === this.state.value){
        if (this.props.nombre === "Vendedor"){
            this.setState({name: this.props.datos[i].nombre, email: this.props.datos[i].email, display: true});
        }
        else if( this.props.nombre === "Transportista"){
          this.setState({name: this.props.datos[i].nombre, display: true});
        }
        else if (this.props.nombre === "Pedido"){
          this.setState({estado: this.props.datos[i].estado, display: true});
        }
        break;
      }
    }
    event.preventDefault();
  }
  mensaje(){
    if (this.props.nombre === "Vendedor"){
      return '\n\tNombre: '+ this.state.name + '\n\tEmail: '+this.state.email;
    }
    else if (this.props.nombre === "Transportista"){
      return '\n\tNombre: '+ this.state.name;
    }
    else if (this.props.nombre === "Pedido"){
      let orden = '';
      for (var i = 0; i < this.props.datos.length; i++) {
        if (this.props.datos[i]._id === this.state.value){
          orden = this.props.datos[i].orden;
          break;
        }
      }
      return '\n\tOrden : ' + orden+ '\n\tEstado: ' + this.state.estado;
    }
    return '';
  }
  genData(){
    if (this.props.nombre === "Vendedor"){
      return {nombre: this.state.name, email: this.state.email};
    }
    else if (this.props.nombre === "Transportista"){
      return {nombre: this.state.name};
    }
    else if (this.props.nombre === "Pedido"){
      return {estado: this.state.estado};
    }
    return {};
  }

  genForm(name){
    if (name === "Vendedor"){
      return (<form onSubmit={this.handleSubmitEditor}>
        <label>
          Nombre:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChangeEditor}/>
          <br></br>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChangeEditor}/>
        </label>
        <input type="submit" value="Submit" />
      </form>);
    }else if( name === "Transportista"){
      return (<form onSubmit={this.handleSubmitEditor}>
        <label>
          Nombre:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChangeEditor}/>
        </label>
        <input type="submit" value="Submit" />
      </form>);
    }else if (name === "Pedido") {
      return (<form onSubmit={this.handleSubmitEditor}>
        <label>
          Estado:
          <input name="estado" type="number" value={this.state.estado} onChange={this.handleChangeEditor}/>
        </label>
        <input type="submit" value="Submit" />
      </form>);
    }

  }
  render() {
    return (
      <div>
      <h3> Editar {this.props.nombre} </h3>
      <div className='col'>
      <div className='row'>
      { !this.state.display &&
      <form onSubmit={this.handleSubmitSelect}>
        <label>
          <select value={this.state.value} onChange={this.handleChangeSelect} >
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
    }
      </div>
      <div className='row'>
      {this.state.display && this.genForm(this.props.nombre)}
      </div>

      </div>
      </div>
    );
  }
}
export default Edit;
