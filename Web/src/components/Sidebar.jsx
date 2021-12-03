// Libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Styles
import '../assets/styles/reset.css';
import '../assets/styles/components/sidebar.css';

function toggleClickBtn(){
    const URL = window.location.pathname;
    console.log(URL);

    if(URL === '/home' || URL === '/budgets' || URL === '/services') {
        var element = document.getElementById("vehicles");
        element.classList.add("active");
    }

    if (URL === '/profile') {
        var element = document.getElementById("profile");
        element.classList.add("active");
    }
}

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            example : ''
        }
    }

    componentDidMount() {
        toggleClickBtn();
    }

    render() {
        const URL = window.location.pathname;
        console.log(URL);
        return(
            <>
                <div className="screen-background">
                    <div className="sidebar-background">
                        <div className="sidebar-content">
                            <div className="sidebar-content-logo">
                                <p>Funilaria<br />Dois Irmãos</p>
                            </div>

                            <div className="sidebar-content-btns">
                                <div className="sidebar-content-btns-main">
                                    <Link to="/home" id="vehicles" className="sidebar-content-btn">
                                        <p>Meus Veículos</p>
                                    </Link>

                                    <Link to="/profile" id="profile" className="sidebar-content-btn">
                                        <p>Meu Perfil</p>
                                    </Link>
                                </div>
                                
                                <Link to="/" className="sidebar-content-btn">
                                    <p>Deslogar</p>
                                </Link>
                            </div>
                            
                        </div>
                    </div>

                    <div className="page-content-background">
                        <div className="page-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar;