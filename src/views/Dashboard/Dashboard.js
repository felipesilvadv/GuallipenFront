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
      });
    fetch(apiUri + "facturados")
        .then(r => r.json())
        .then(r => {
          this.setState({
            facturados: r
          });
          console.log(this.state.facturados);
        });
    fetch(apiUri + "liberados")
          .then(r => r.json())
          .then(r => {
            this.setState({
              liberados: r
            });
            console.log(this.state.liberados);
          });
    fetch(apiUri + "transportistas")
      .then(r => r.json())
      .then(r => {
        this.setState({
          transportistas: r
        });
      })
  }

  render() {
    if (!this.state.ingresados || !this.state.liberados || !this.state.facturados) return <div />;
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
          <div className="col">
            <Ruta title="Ruta 1" />
          </div>
          <div className="col">
            <Ruta title="Ruta 2" />
          </div>
          <div className="col">
            <Ruta title="Ruta 3" />
          </div>
          <div className="col">
            <Ruta title="Ruta 4" />
          </div>
          <div className="col">
            <Ruta title="Ruta 5"/>
          </div>
          <div className="col">
            <Ruta title="Ruta 6"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
