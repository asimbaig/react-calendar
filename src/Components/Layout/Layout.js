import React from 'react';
import { connect } from 'react-redux';

import './Layout.css';
import Toolbar from  '../Navigation/Toolbar/Toolbar';

const Layout = (props)=> {
        return (
            <>
                <Toolbar
                    isAuth={props.isAuthenticated}/>
                 <main style={{marginTop: "30px"}}>
                    {props.children}
                </main>
            </>
        )
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

export default connect( mapStateToProps )( Layout );