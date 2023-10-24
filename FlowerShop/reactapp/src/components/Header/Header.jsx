import React from 'react';
import '../../styles/component/header.css'

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                {this.props.title}
            </header>
        );
    }
}
export default Header