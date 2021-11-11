import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Profile extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <View>
                <Text>El nombre del usuario es: {this.props.username}</Text>
                <Text>El email del usuario es: {this.props.mail}</Text>
                <Text>La fecha del ultimo login del usuario es: {this.props.ultFecha}</Text>
                <Text>La fecha de alta del usuario es: {this.props.fecha}</Text>
                <TouchableOpacity onPress={()=>this.props.unLog()}>
                    <Text style={style.boton}>Unlog</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    }
})