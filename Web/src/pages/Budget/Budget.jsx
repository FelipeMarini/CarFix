// Libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

// Styles
import '../../assets/styles/reset.css';
import '../../assets/styles/pages/budget.css';

// Components
import Sidebar from '../../components/Sidebar';


class Budget extends Component {
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
                    <div className="budget-header">
                        <Link to="/home" className="budget-header-back">{"< Meus Veículos"}</Link>
                        <div className="budget-title">
                            <h1>Chevrolet Onix</h1>
                        </div>
                        <div className="budget-placa">
                            <p>Placa: ABC-1234</p>
                        </div>
                    </div>
                    
                    <div className="budget-card-background">
                        <p className="budget-card-background-title">Orçamentos</p>

                        <div className="budget-card-content-background">
                            <Link to="/services" className="budget-content-background">
                                <div className="budget-content-text">
                                    <h1>Orçamento #0001</h1>
                                     <p>Data de Início: 20/09/2021</p>
                                     <p>Data de Término: ----</p>
                                </div>

                                <div className="budget-content-btn">
                                     <p>Status: Em Andamento</p>
                                     <p className="budget-content-btn-valor">Valor: R$ 3.872,28</p>
                                </div>
                            </Link>

                            <Link to="/services" className="budget-content-background">
                                <div className="budget-content-text">
                                    <h1>Orçamento #0002</h1>
                                     <p>Data de Início: ----</p>
                                     <p>Data de Término: ----</p>
                                </div>

                                <div className="budget-content-btn">
                                     <p>Status: Rejeitado pelo Cliente</p>
                                     <p className="budget-content-btn-valor">Valor: R$ 872,28</p>
                                </div>
                            </Link>

                            <Link to="/services" className="budget-content-background">
                                <div className="budget-content-text">
                                    <h1>Orçamento #0003</h1>
                                     <p>Data de Início: ----</p>
                                     <p>Data de Término: ----</p>
                                </div>

                                <div className="budget-content-btn">
                                     <p>Status: Pendente</p>
                                     <p className="budget-content-btn-valor">Valor: R$ 3.872,28</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Sidebar>
            </>
        )
    }
}

export default Budget;