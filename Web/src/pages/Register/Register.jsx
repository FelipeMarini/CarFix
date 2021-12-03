// Libs
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

// Styles
import "../../assets/styles/reset.css";
import "../../assets/styles/pages/register.css";

// Images
import banner from '../../assets/images/pages/register-banner.svg';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exemplo : ''
    };
  }

  render() {
    return (
        <>
            <div className="register-background">
                {/* Área do formulário (lado esquerdo) */}
                <div className="register-form-background">
                    <div className="register-form-content">
                        <div className="register-form-text">
                            <h1>Criar uma nova conta</h1>
                            <p>Crie uma conta para que você possa acompanhar os nossos Serviços.</p>
                        </div>

                        <div className="register-form-main">
                            <div className="register-form-input">
                                <input type="text" placeholder="Digite o seu nome" />
                            </div>

                            <div className="register-form-input">
                                <input type="text" placeholder="Digite o seu e-mail" />
                            </div>

                            <div className="register-form-input-separated">
                                <div className="register-form-input">
                                    <input type="password" placeholder="Digite uma senha" />
                                </div>

                                <div className="register-form-input">
                                    <input type="password" placeholder="Repita a senha" />
                                </div>
                            </div>

                            <div className="register-form-input-separated">
                                <div className="register-form-input">
                                    <input type="tel" placeholder="Digite o seu telefone" />
                                </div>

                                <div className="register-form-input">
                                    <input type="tel" placeholder="Digite o seu celular" />
                                </div>
                            </div>

                            <div className="register-form-btns">
                                <button>Criar conta</button>
                                <Link to="/">Já tenho uma conta!</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Área do banner (lado direito) */}
                <div className="register-banner-background">
                    <div className="register-banner-content">
                        <img src={banner} alt="Banner" draggable="false" />
                    </div>
                </div>
            </div>
        </>
    );
  }
}