import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import { db } from '../firebase/config'

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            posteos: [],
            loading: true
        }
    }

    componentDidMount(){
        db.collection('posts')
        .where('email','==',this.props.mail)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            docs => {
                let posts = []
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                console.log(posts);
                this.setState({
                    posteos: posts,
                    loading: false
                })
            }
        )
    }

    borrarPost(item){
        console.log(item);
        db.collection("posts").doc(item.id).delete().then(() => {
            alert('estas borrando tu posteo')
        }).catch((error) => {
            alert("Error: ", error);
        });
    }


    render(){
        return(
            <View>
                <Text>El nombre del usuario es: {this.props.username}</Text>
                <Text>El email del usuario es: {this.props.mail}</Text>
                <Text>La fecha del ultimo login del usuario es: {this.props.ultFecha}</Text>
                <Text>La fecha de alta del usuario es: {this.props.fecha}</Text>
                <Text>Posteos realizados por el usuario: {this.state.posteos.length}</Text>
                <FlatList
                data = {this.state.posteos}
                keyExtractor = {item => item.id.toString()}
                renderItem = {({item}) => <View style={style.posteos}>
                    <Text>{item.data.description}</Text>
                    <Image source = {item.data.photo} style = {style.imagen}/>
                <TouchableOpacity onPress={()=>this.borrarPost(item)}>
                    <Text style={style.botonBorrar}>Borrar</Text>
                </TouchableOpacity>
                </View>}
                
                />
                
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
    },
    botonBorrar: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
        width: '50%',
        position:'relative',
        marginLeft: '25%'
    },
    posteos:{
        textAlign:'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
    },
    imagen: {
        height: 205,
        width: '80%',
        position: 'relative',
        marginLeft: 34,
        marginTop: 5,
        marginBottom: 5
    }
})