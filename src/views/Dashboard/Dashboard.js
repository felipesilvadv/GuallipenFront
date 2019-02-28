import React, { Component } from "react";
import Estado from "./Estado";
import Superior from "./Superior";
import Ruta from "./Ruta";
import apiUri from "../../apiUri";

const urlIndicadores = valor => "https://mindicador.cl/api/" + valor;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(apiUri + "ingresados");
    fetch(apiUri + "ingresados")
      .then(r => r.json())
      .then(r => {
        this.setState({
          ingresados: r
        });
        console.log(this.state.ingresados);
      }).catch(r => {
        console.log(r);
      });
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
    fetch(apiUri + "liberados")
          .then(r => r.json())
          .then(r => {
            this.setState({
              liberados: r
            });
            console.log(this.state.liberados);
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
    fetch(apiUri + "rutas")
      .then(r => r.json())
      .then(r => {
        this.setState({
          rutas: r
        });
      }).catch(r => {
        console.log(r);
      });
  }

  render() {
    if (!this.state.ingresados || !this.state.liberados || !this.state.facturados || !this.state.transportistas || !this.state.rutas)
    return <div className='row'><div className='col'> <h1> Recarga la página </h1></div></div>;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Superior title="Ingresadas" data={this.state.ingresados} />
          </div>
          <div className="col">
            <Superior title="Liberadas" data={this.state.liberados} />
          </div>
          <div className="col">
            <Superior title="Facturadas" data={this.state.facturados} />
          </div>
        </div>
        <div className="row">
        {
          this.state.transportistas.map((item, i) => {
            return (
              <div key={item._id} className="col">
                <Ruta key={item._id} transfer={item} rutas={this.state.rutas}  />
              </div>
            )
          })
        }

        </div>
      </div>
    );
  }
}

export default Dashboard;
