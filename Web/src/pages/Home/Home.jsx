// Libs
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

// Styles
import "../../assets/styles/reset.css";
import "../../assets/styles/pages/home.css";
import "../../assets/styles/modals/new-vehicle.css";

// Components
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';

// Images
import car from '../../assets/images/pages/home-red-car-example.svg';
import close from '../../assets/images/modals/modal-close-icon.svg';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exemplo : '',

      isModalOpen : false
    };
  }

  cancelaModal = () => {
    this.setState({ isModalOpen : false })
  }

  render() {
    return (
        <>
            <Sidebar>
                <div className="home-title">
                  <h1>Meus Veículos</h1>
                </div>
                <div className="home-btn">
                    <button onClick={() => this.setState({isModalOpen : true})}>Novo Veículo</button>
                </div>
                
                {/* Card dos carros */}
                <div className="home-card-background">
                    {/* Vocês vão colocar essa 'div' (Link) dentro do 'map' para conseguir listar */}
                    <Link to="/budgets" className="home-content-background">
                        <div className="home-content-car-image">
                            <img src={car} alt="Imagem de um carro vermelho" draggable="false" />
                        </div>

                        <div className="home-content-text">
                            <h1>Chevrolet Onix</h1>
                            <p>Placa: ABC-1234</p>
                            <p>Cor: Vermelho</p>
                        </div>

                        <div className="home-content-btn">
                            <p>Visualizar Orçamentos</p>
                        </div>
                    </Link>
                    
                    {/* Exemplo (apagar!) */}
                    <Link className="home-content-background">
                        <div className="home-content-car-image">
                            <img src={car} alt="Imagem de um carro vermelho" draggable="false" />
                        </div>

                        <div className="home-content-text">
                            <h1>Chevrolet Onix</h1>
                            <p>Placa: ABC-1234</p>
                            <p>Cor: Vermelho</p>
                        </div>

                        <div className="home-content-btn">
                            <p>Visualizar Orçamentos</p>
                        </div>
                    </Link>

                    {/* Exemplo (apagar!) */}
                    <Link className="home-content-background">
                        <div className="home-content-car-image">
                            <img src={car} alt="Imagem de um carro vermelho" draggable="false" />
                        </div>

                        <div className="home-content-text">
                            <h1>Chevrolet Onix</h1>
                            <p>Placa: ABC-1234</p>
                            <p>Cor: Vermelho</p>
                        </div>

                        <div className="home-content-btn">
                            <p>Visualizar Orçamentos</p>
                        </div>
                    </Link>

                    {/* Exemplo (apagar!) */}
                    <Link className="home-content-background">
                        <div className="home-content-car-image">
                            <img src={car} alt="Imagem de um carro vermelho" draggable="false" />
                        </div>

                        <div className="home-content-text">
                            <h1>Chevrolet Onix</h1>
                            <p>Placa: ABC-1234</p>
                            <p>Cor: Vermelho</p>
                        </div>

                        <div className="home-content-btn">
                            <p>Visualizar Orçamentos</p>
                        </div>
                    </Link>
                </div>
            </Sidebar>



            {/* Modal */}
            <Modal isOpen={this.state.isModalOpen}>
                <div className="modal-overlay">
                    <div className="modal" id="modal" onClick={() => document.getElementById('modal-card').click() ? '' : this.cancelaModal()}></div>
                    <div className="modal-card-background" id="modal-card">
                        <div className="modal-card-close">
                            <img src={close} alt="Ícone para fechar o modal" draggable="false" onClick={() => this.cancelaModal()} />
                        </div>

                        <div className="modal-vehicle-card-form-background">
                            <div className="modal-vehicle-card-form">
                                <div className="modal-vehicle-card-form-text">
                                    <h1>Adicionar um novo veículo</h1>
                                    <p>Adicione as informações do seu Veículo</p>
                                </div>

                                <div className="modal-vehicle-card-form-input-background">
                                    <div className="modal-vehicle-card-form-input">
                                        <input type="text" placeholder="Insira o Modelo de seu Veículo" />
                                    </div>

                                    <div className="modal-vehicle-card-form-input">
                                        <input type="text" placeholder="Marca" />
                                    </div>

                                    <div className="modal-vehicle-card-form-input">
                                        <input type="year" placeholder="Ano" />
                                    </div>

                                    <div className="modal-vehicle-card-form-input">
                                        <input type="text" placeholder="Cor" />
                                    </div>

                                    <div className="modal-vehicle-card-form-input">
                                        <input type="text" placeholder="Placa" />
                                    </div>

                                    <button>Adicionar Veículo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
  }
}