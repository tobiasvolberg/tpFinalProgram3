import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default class Buscador extends Component{
    constructor(props){
        super(props)
        this.state = {
            buscador: ''
        }
    }

    buscar(){
        
    }

    render(){
        return(
            <View>
                <TextInput 
                style={styles.field}
                placeholder="Ingrese un Mail para buscar"
                onChangeText={text => this.setState({ buscador: text })}
                />
                <TouchableOpacity onPress = {this.buscar()}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal:10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    }
})