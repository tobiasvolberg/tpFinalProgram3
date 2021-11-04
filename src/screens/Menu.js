import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { Component } from 'react'
import Register from './Register';
import Login from './Login';
import CreatePost from './CreatePost';
import Profile from './Profile';
import { auth } from '../firebase/config';
import Home from './Home';

export default class Menu extends Component {
    constructor(props){
        super(props)
        this.state ={
            loggedIn: false,
            fecha: '',
            mail: '',
            ultFecha: '',
            error: ''
        }
    }

    handleRegister(email, password, username){
        auth.createUserWithEmailAndPassword(email, password)
        .then((response)=> {
            console.log(response);
            alert('ususario regsitrado')
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                loggedIn:true,
                fecha: response.user.metadata.creationTime,
                mail: response.user.email,
                ultFecha: response.user.metadata.lastSignInTime
            })
        })
        .catch( error => {
            console.log(error);
            alert('error en el registro')
            this.setState({
                error: 'fallo en el registro'
            })
        })
    }

    handleLogin(email, password) {
        auth.signInWithEmailAndPassword(email, password)
        .then((response)=> {
            console.log(response);
            alert('ususario logueado')
            this.setState({
                loggedIn:true,
                fecha: response.user.metadata.creationTime,
                mail: response.user.email,
                ultFecha: response.user.metadata.lastSignInTime
            })
        })
        .catch( error => {
            console.log(error);
            alert('credenciales invalidas')
            this.setState({
                error: 'credenciales invalidas'
            })
        })
    }

    unLog(){
        auth.signOut()
        .then((response)=>{
            alert('estas desloguenadote')
            this.setState({
                loggedIn:false
            })
        })
        .catch(error => {
            console.log(error);
            alert('error en el sign out')
            this.setState({
                error: 'fallo en el signout'
            })
        })
    }

    render(){
        const Drawer = createDrawerNavigator()
        return(
            <NavigationContainer>
            <Drawer.Navigator>
                {this.state.loggedIn === true ?
                <React.Fragment>
              <Drawer.Screen name='Home' component={()=><Home />}></Drawer.Screen>
              <Drawer.Screen name="Profile">
                  {props => <Profile {...props} fecha={this.state.fecha} mail={this.state.mail}
                  ultFecha={this.state.ultFecha}
                  unLog={()=>this.unLog()}
                  />}
              </Drawer.Screen>
              <Drawer.Screen name='Create Post'>
                  {props => <CreatePost {...props}/>}
              </Drawer.Screen>
              </React.Fragment>
              :
              <React.Fragment>
                  <Drawer.Screen name="Login">
                  {props => <Login {...props} handleLogin={(email,password)=>this.handleLogin(email,password)}
                  />}
                  </Drawer.Screen>
                  <Drawer.Screen name="Registro">
                  {props => <Register {...props} handleRegister={(email,password, username)=>this.handleRegister(email,password,username)} />}
                  </Drawer.Screen>
              </React.Fragment>
              }
              
                      
            </Drawer.Navigator>
          </NavigationContainer>
        )
    }
}
