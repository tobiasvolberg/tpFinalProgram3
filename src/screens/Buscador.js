import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, FlatList, Text } from "react-native";
import {db} from '../firebase/config'

export default class Buscador extends Component{
    constructor(props){
        super(props)
        this.state = {
            buscador: '',
            posteos: []
        }
    }

    buscar(){
        db.collection('posts')
        .where('email','==',this.state.buscador)
        .onSnapshot(
            docs => {
                let posts = []
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                // console.log(posts);
                this.setState({
                    posteos: posts,
                })
            }
        )
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
                <FlatList 
                    data = {this.state.posteos}
                    keyExtractor = {item => item.id.toString()}
                    renderItem = {({item}) => <Text>{item.data.description}</Text> }
                /> 
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