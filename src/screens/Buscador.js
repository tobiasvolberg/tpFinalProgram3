import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, FlatList, Text, Image } from "react-native";
import {db} from '../firebase/config'

export default class Buscador extends Component{
    constructor(props){
        super(props)
        this.state = {
            buscador: '',
            posteos: []
        }
    }

    buscar(text){
        db.collection('posts')
        .where('email','==',text)
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
                keyboardType='email-address'
                placeholder="Ingrese un Mail para buscar"
                onChangeText={text => this.buscar(text)}
                />
              
               {this.state.posteos.length == 0?
               <Text> El usuario no existe o no tiene ninguna publicación</Text> :
               <FlatList 
                   data = {this.state.posteos}
                   keyExtractor = {item => item.id.toString()}
                   renderItem = {({item}) => <View style={styles.container}> <Text>{item.data.description}</Text> 
                    <Image source={item.data.photo}  style={styles.imagen}/> </View>}
               /> 
            
            }
               
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
    },

    imagen:{
        height: 205,
        width: '80%',
        position: 'relative',
        marginLeft: 34
    },

    container: {
        textAlign:'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
    }
})