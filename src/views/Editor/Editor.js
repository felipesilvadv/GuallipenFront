import React, { Component } from "react";
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Entidad from './Entidad';



class Editor extends Component {
  render() {
  return (
  <Tabs>
    <TabList>
      <Tab>Vendedor</Tab>
      <Tab>Transportista</Tab>
      <Tab>Pedido</Tab>

    </TabList>

    <TabPanel>
    <Entidad nombre={"Vendedor"} route={"vendedores"}/>
    </TabPanel>
    <TabPanel>
      <Entidad nombre={"Transportista"} route={"transportistas"} />
    </TabPanel>
    <TabPanel>
      <Entidad nombre={"Pedido"} route={"pedidos"} />
    </TabPanel>

  </Tabs>
);
  }
}

export default Editor;
