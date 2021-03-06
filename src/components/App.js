import React, { Component } from 'react';
import Header from './Header';
import Form from './Form'
import Resumen from './Resumen'
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';

class App extends Component {

  state = {
    resultado: '',
    datos: {}
  }

  cotizarSeguro = (datos) => {
    const { marca, plan, year } = datos;

    //Agregar costo base de 2000
    let resultado = 2000;

    //Obtener la diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);
   

    //Por cada año restar el 3%
    resultado -= ((diferencia * 3) * resultado / 100);

    //Aumentar porcentaje Americano 15%, Asiatico 5%, Europeo 30%
    resultado = calcularMarca(marca) * resultado;

    //Aumentar el plan del auto, basico aumentar 20%, completo 50%
    let incrementarPlan = obtenerPlan(plan);

    //Dependiendo del plan, incrementar
    resultado = parseFloat(incrementarPlan * resultado).toFixed(2);

    //Crear obtejo apra el auto
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }

    //Resultado
    this.setState({
      resultado: resultado,
      datos: datosAuto
    })
  }


  render(){
    return (
      <div className="contenedor">
        <Header
          titulo = 'Cotizador de Seguro de auto'
        />
  
        <div className="contenedor-formulario">
          <Form 
            cotizarSeguro={this.cotizarSeguro}
          />
          <Resumen
            datos={this.state.datos}
            resultado={this.state.resultado}
          />
        </div>
      </div>
  
      
    );
  }
}

export default App;
