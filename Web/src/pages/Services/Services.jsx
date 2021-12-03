// Libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

// Styles
import '../../assets/styles/reset.css';
import '../../assets/styles/pages/services.css';

// Components
import Sidebar from '../../components/Sidebar';


class Services extends Component {
    constructor(props){
        super(props);
        this.state = {
            example : ''
        }
    }

    render() {
        return(
            <>
                <Sidebar>
                    <div className="services-header">
                        <Link to="/budgets" className="services-header-back">{"< Chevrolet Onix"}</Link>
                        <div className="services-title">
                            <h1>Orçamento #0001</h1>
                        </div>
                        <div className="services-name">
                            <p>Chevrolet Onix</p>
                        </div>
                        <div className="services-texts">
                            <p>Placa: ABC-1234</p>
                            <p>Data de Início: 20/10/2021</p>
                            <p>Data de Término: 21/10/2021</p>
                        </div>
                    </div>

                    <div className="services-card-background">
                        <p className="services-card-background-title">Serviços</p>

                        {/* Cards */}
                        <div className="services-card-content-background">
                            
                            {/* Vocês vão colocar essa 'div' dentro do 'map' para conseguir listar */}
                            <div className="services-content-background">
                                <div className="services-content-text">
                                    <h1>Troca de Rodas</h1>
                                    <p className="services-content-text-descricao">Descrição: Substituir as rodas Padrão para Rodas Personalizadas</p>
                                    <p>Data de Início: 20/10/2021</p>
                                    <p>Data de Término: 21/10/2021</p>
                                </div>

                                <div className="services-content-btn">
                                     <p>Status: Finalizado</p>
                                     <p className="services-content-btn-valor">Valor: R$ 820,76</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </Sidebar>
            </>
        )
    }
}

export default Services;