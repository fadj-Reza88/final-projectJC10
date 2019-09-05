import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookie from 'universal-cookie'
import { resetUser } from "./../../redux/1.actions";
import './Navbar.css'
// import { MDBInput } from "mdbreact";


let cookieObj = new Cookie()
class NavbarComp extends Component {
    state = {
        navbarOpen : false
    }

    onBtnLogout = () => {
        cookieObj.remove('userData')
        this.props.resetUser()
    }

    render() {
        return (
            <div>
                <Navbar className='nav' expand="md">
                
                    <Link to="/"><i class="fas fa-car-battery"><NavbarBrand>Ruang Elektronik.<sub>com</sub></NavbarBrand></i></Link>
                    <NavbarToggler onClick={() => this.setState({navbarOpen : !this.state.navbarOpen})} />
                    <div className="md-form my-0">
                      <input className="form-control mr-sm-2" type="text" placeholder="Mencari Kategori" aria-label="Search" />
                    </div>

                    <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                            {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.showId ? this.props.userObj.id : null}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.role}</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {
                                                this.props.userObj.role == 'admin'
                                                ?
                                                <Link style={{textDecoration:'none', color:'inherit'}} to="/admin/dashboard">
                                                    <DropdownItem>
                                                        Admin Dashboard
                                                    </DropdownItem>
                                                </Link>
                                                :
                                                null
                                            }
                                            <Link to="/cart" style={{textDecoration:'none', color:'inherit'}}>
                                                <DropdownItem>
                                                    Cart
                                                </DropdownItem>
                                            </Link>
                                            <DropdownItem>
                                                History
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.onBtnLogout}>
                                                Logout
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                                :
                                <>
                                    <NavItem style={{borderRight : '1px solid lightgrey'}}>
                                        <Link to="/auth"><NavLink>Masuk</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/auth"><NavLink>Daftar</NavLink></Link>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userObj : state.user
    }
}

export default connect(mapStateToProps, {resetUser})(NavbarComp)