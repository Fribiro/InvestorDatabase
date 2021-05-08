import React, { Component } from 'react'
import Footer from "../../components/headerFooter/Footer";
import Header from "../../components/headerFooter/Header";

export default class Contact extends Component {
    state = {
        visible: true,
    };
        
    render() {
        return (
          <div>
            {this.state.visible ? <Header /> : null}
            {this.state.visible ? <Footer /> : null}
          </div>
        );
    }
}
