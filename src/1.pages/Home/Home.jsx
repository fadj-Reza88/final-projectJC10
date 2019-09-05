import React, { Component } from 'react';
import {connect} from 'react-redux'
import ProductBox from '../../2.components/General/ProductBox';
import Axios from 'axios'
import {urlApi} from '../../3.helpers/database'
import swal from 'sweetalert'
import Carousel from '../../2.components/General/Carousel'
// import {Link} from 'react-router-dom'
import { toggleUserId } from '../../redux/1.actions';
import './Home.css'

// GIT PULL ORIGIN MASTER
class Home extends Component {
    state = {
        productData : []
    }

    

    componentDidMount(){
        this.getDataProducts()
    }

    getDataProducts = () => {
        Axios.get(urlApi + 'products')
        .then((res) => {
            this.setState({productData : res.data})
        })
        .catch((err) => {
            console.log(err)
            swal('Error', 'System Error', 'error')
        })
    }

    renderProducts = () => {
        let jsx = this.state.productData.map(val => {
            return(
                <ProductBox nama={val.nama} harga={val.harga} discount={val.discount} img={val.img} id={val.id} />
            )
        })
        return jsx
    }

    render() {
        return (
            
            <div >
                   
                        <div >
                            <Carousel />
                        </div>
                   
                {/* </div> */}
                <br/>
                <br/>
                    <div className="kotak" style={{textAlign:"center"}}>
                        <h2 >Galeri</h2>
                    </div>
                    <br/>
                    <br/>
                <div className="container">
                    <div className="row justify-content-center ">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        username : state.user.username
    }
}, {toggleUserId})(Home)