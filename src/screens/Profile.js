import { CurrentRenderContext } from '@react-navigation/core'
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
                <Text style={style.nombrePerfil}>Nombre de Usuario:</Text><Text style={style.nombreDatos}>{this.props.username}</Text>
                <Text style={style.nombrePerfil}>Email: </Text><Text style={style.nombreDatos}>{this.props.mail}</Text>
                <Text style={style.nombrePerfil}>Ultimo login: </Text><Text style={style.nombreDatos}>{this.props.ultFecha}</Text>
                <Text style={style.nombrePerfil}>Alta:</Text><Text style={style.nombreDatos}> {this.props.fecha}</Text>
                <Text style={style.nombrePerfil}>Posteos :</Text><Text style={style.nombreDatos}> {this.state.posteos.length}</Text>
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
    },
    nombrePerfil:{
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 6
    },
    nombreDatos:{
        alignSelf: 'center',
        paddingTop: 3

    }
})