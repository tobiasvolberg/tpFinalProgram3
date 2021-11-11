import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: '',
            username: '',
            password: '',
            error: ''
        }
    }

    

    render(){
        return(
            <View style={style.container}>
                <Text>Email</Text>
                    <TextInput 
                    style = {style.textInput}
                    keyboardType='email-adress'
                    placeholder = 'Ingrese su Mail'
                    onChangeText = {text => this.setState({email:text})}
                    />
                    <Text>User Name</Text>
                    <TextInput 
                    style = {style.textInput}
                    placeholder = 'Nombre de usuario'
                    onChangeText = {text => this.setState({username:text})}
                    />
                    <Text>Password</Text>
                    <TextInput 
                    style = {style.textInput}
                    keyboardType='password'
                    placeholder = 'Contraseña'
                    secureTextEntry = {true}
                    onChangeText = {text => this.setState({password:text})}
                    />

                    {this.state.email=='' || this.state.username=='' || this.state.password=='' ? 
                    
                    <TouchableOpacity 
                    style ={style.botongris}
                    >
                       <Text style={style.textoBoton}> Registrate </Text>
                    </TouchableOpacity>

                    :
                    <TouchableOpacity onPress = {()=>this.props.handleRegister(this.state.email, this.state.password, this.state.username)}
                    style ={style.boton}
                    >
                       <Text style={style.textoBoton}> Registrate </Text>
                    </TouchableOpacity>
                    }
                    


                    
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        textAlign:'center',
        paddingHorizontal: 10,
        marginTop: 20
    },
    textInput: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal:10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    botongris: {
        backgroundColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'grey'
    },
    textoBoton: {
        color: '#fff'
    }
})