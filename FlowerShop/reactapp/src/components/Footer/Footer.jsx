import React from 'react';
import '../../styles/component/footer.css'
import {
    MDBFooter
    //MDBContainer,
    //MDBCol,
    //MDBRow,
    //MDBIcon,
    //MDBBtn
} from 'mdb-react-ui-kit';

class Footer extends React.Component {
    render() {       
        return (
            <MDBFooter className='bg-dark text-center text-white'>
                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2024 
                    <a className='text-white' href='https://mdbootstrap.com/'>
                        Мята FlowerShop
                    </a>
                </div>
            </MDBFooter>
        );
    };
}


export default Footer;
