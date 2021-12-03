// Libs
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { parseJwt, userAuthentication } from '../../services/Auth';

// Styles
import "../../assets/styles/reset.css";
import "../../assets/styles/pages/login.css";
import "../../assets/styles/modals/recover-password.css";

// Images
import banner from '../../assets/images/pages/login-banner.svg';
import close from '../../assets/images/modals/modal-close-icon.svg';

// Components
import Modal from '../../components/Modal';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exemplo: '',
            isModalOpen: false,
            email: '',
            password: '',
            erroMensagem: '',
            isLoading: false
        };
    }


    efetuaLogin = (event) => {

        // Ignora o comportamento padrão do navegador (recarregar a página, por exemplo)

        event.preventDefault();

        // Remove a frase de erro do state erroMensagem e define que a requisição está em andamento

        this.setState({ erroMensagem: '', isLoading: true });
        // Define a URL e o corpo da requisição

        axios.post('http://44.195.209.235/api/login', {

            email: this.state.email,
            password: this.state.password

        })
            // Verifica o retorno da requisição
            .then(resposta => {

                // Caso o status code seja 200,

                if (resposta.status === 200) {

                    // salva o token no localStorage,

                    localStorage.setItem('user-token', resposta.data.token);

                    // exibe o token no console do navegador

                    console.log('Meu token é: ' + resposta.data.token);

                    // e define que a requisição terminou

                    this.setState({ isLoading: false })

                    // Define a variável base64 que vai receber o payload do token

                    let base64 = localStorage.getItem('user-token').split('.')[1];

                    // Exibe no console o valor presente na variável base64

                    console.log(base64);

                    // Exibe no console o valor convertido de base64 para string

                    console.log(window.atob(base64));

                    // Exibe no console o valor convertido da string para JSON

                    console.log(JSON.parse(window.atob(base64)));

                    // Exibe no console apenas o tipo de usuário logado
                    console.log("teste:" + parseJwt().role);

                    // Verifica se o tipo de usuário logado é Administrador

                    // Se for, redireciona para a página de Tipos Eventos
                    
                    if (parseJwt().role === 'Administrador') {

                        this.props.history.push('/Home');

                        console.log('estou logado: ' + userAuthentication());

                    }



                    // Se não for, redireciona para a página home

                    else {

                        this.props.history.push('/')

                    }

                }

            })

            // Caso haja um erro,

            .catch(() => {

                // define o state erroMensagem com uma mensagem personalizada e que a requisição terminou

                this.setState({ erroMensagem: 'E-mail ou senha inválidos! Tente novamente.', isLoading: false });

            })

    }


    // pode ser reutilizada em vários inputs diferentes

    atualizaStateCampo = (campo) => {

        this.setState({ [campo.target.name]: campo.target.value })

    };


    cancelaModal = () => {
        this.setState({ isModalOpen: false })
    }

    render() {
        return (
            <>
                <div className="login-background">
                    {/* Área do formulário (lado esquerdo) */}
                    <div className="login-form-background">
                        <div className="login-form-content">
                            <div className="login-form-text">
                                <h1>Bem vindo de volta!</h1>
                                <p>Insira suas credenciais de login para entrar no sistema.</p>
                            </div>

                            <form onSubmit={this.efetuaLogin}>
                            <div className="login-form-main">
                                <div className="login-form-input">
                                    <input name="email" type="email" placeholder="E-mail"  value={this.state.email} onChange={this.atualizaStateCampo} />
                                </div>

                                <div className="login-form-input">
                                    <input name="password" type="password" placeholder="Senha" value={this.state.password} onChange={this.atualizaStateCampo} />
                                </div>

                                <button >Entrar</button>
                            </div>
                            </form>
                            <div className="login-form-btns">
                                <p onClick={() => this.setState({ isModalOpen: true })}>Esqueceu a Senha?</p>
                                <p>Você não tem uma conta? <Link to="/register">Registre-se</Link></p>
                            </div>
                        </div>
                    </div>
                   

                    {/* Área do banner (lado direito) */}
                    <div className="login-banner-background">
                        <div className="login-banner-content">
                            <img src={banner} alt="Banner" draggable="false" />
                        </div>
                    </div>
                </div>


                
                {/* Modal */}
                <Modal isOpen={this.state.isModalOpen}>
                    <div className="modal-overlay">
                        <div className="modal" id="modal" onClick={() => document.getElementById('modal-card').click() ? '' : this.cancelaModal()}></div>
                        <div className="modal-card-background" id="modal-card">
                            <div className="modal-card-close">
                                <img src={close} alt="Ícone para fechar o modal" draggable="false" onClick={() => this.cancelaModal()} />
                            </div>

                            <div className="modal-card-form-background">
                                <div className="modal-card-form">
                                    <div className="modal-card-form-text">
                                        <h1>Recuperar Senha</h1>
                                        <p>Esqueceu sua senha? Insira os dados abaixo para recuperar suas credenciais</p>
                                    </div>

                                    <div className="modal-card-form-input">
                                        <input type="email" placeholder="E-mail Cadastrado" />
                                    </div>

                                    <button>Recuperar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}