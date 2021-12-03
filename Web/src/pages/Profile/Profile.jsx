// Libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

// Styles
import '../../assets/styles/reset.css';
import '../../assets/styles/pages/profile.css';
import '../../assets/styles/modals/edit-profile.css';

// Components
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';

// Images
import close from '../../assets/images/modals/modal-close-icon.svg';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            example : '',

            isModalOpen : false
        }
    }

    cancelaModal = () => {
        this.setState({ isModalOpen : false })
    }

    render() {
        return(
            <>
                <Sidebar>
                    <div className="profile-header">
                        <div className="profile-title">
                            <h1>Leonardo Rodrigues</h1>
                        </div>
                        <div className="profile-texts">
                            <p>Meu Perfil</p>
                        </div>
                    </div>

                    <div className="profile-info-background">
                        <div className="profile-info-list">
                            <h2>Informações Pessoais:</h2>
                            <p>Nome: Leonardo Rodrigues</p>
                            <p>Email: leonardo@darede.com</p>
                            <p>Telefone: (11) 5555-5555</p>
                            <p>Celular: (11) 5555-5555</p>
                        </div>

                        <div className="profile-info-edit">
                            <h2>Editar Informações:</h2>
                            <button onClick={() => this.setState({isModalOpen : true})}>Editar Informações Pessoais</button>
                            <button>Alterar minha Senha</button>
                        </div>
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

                            <div className="modal-profile-card-form-background">
                                <div className="modal-profile-card-form">
                                    <div className="modal-profile-card-form-text">
                                        <h1>Editar Perfil</h1>
                                        <p>Edite as informações pessoais do seu Perfil</p>
                                    </div>

                                    <div className="modal-profile-card-form-input-background">
                                        <div className="modal-profile-card-form-input">
                                            <input type="text" value="Leonardo Rodrigues" />
                                        </div>
                                        
                                        <div className="modal-profile-card-form-input">
                                            <input type="text" value="leonardo@darede.com" />
                                        </div>

                                        <div className="modal-profile-card-form-input">
                                            <input type="text" value="(11) 5555-5555" />
                                        </div>

                                        <div className="modal-profile-card-form-input">
                                            <input type="text" value="(11) 5555-5555" />
                                        </div>

                                        <button>Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

export default Profile;