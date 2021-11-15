import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Button } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from 'firebase';
import {Modal} from "react-native"


export default class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            comments: '',
            comented: false,
            showModal: false
        }
    }
    componentDidMount(){
        if (this.props.likes ) {
            if (this.props.likes.includes(auth.currentUser.email)) {
                this.setState({
                    liked:true,
                })
            }
            this.setState({
                likes: this.props.likes.length
            })
        }
        if (this.props.comments ) {
            if (this.props.comments.includes(auth.currentUser.email)) {
                this.setState({
                    comented:true,
                })
            }
            
        }
    }

    likeando(){
        let likeos = db.collection("posts").doc(this.props.id)
        return likeos.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            console.log("Likeo okey!");
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            })
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    deslikeando(){
        let likeos = db.collection("posts").doc(this.props.id)
        return likeos.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            console.log("Deslikeo okey!");
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            })
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    comentando(){
        let comentarios = db.collection("posts").doc(this.props.id)
        return comentarios.update({
            comments: firebase.firestore.FieldValue.arrayUnion({comment: this.state.comments,
            owner: auth.currentUser.email,
            })
        })
        .then(() => {
            console.log("Comentario okey!");
            this.setState({
                comments: '',
                comented: true
            })
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

   verComentarios(){
       this.setState({
           showModal: true
       })
   }

   cerrarModal(){
    this.setState({
        showModal: false
    })
   }


    render(){
        let d = new Date(this.props.createdAt)
        return(
            <View style = {style.container}>
                <Text>Comentario: {this.props.description}</Text>
                <Text>Dia creado: {d.toDateString()}</Text>
                <Text>Usuario: {this.props.owner}</Text>
                <Image source = {this.props.photo} style = {style.imagen}/>
                {this.state.liked === false ?
                <TouchableOpacity style={style.botonLike} onPress={()=>this.likeando()}>
                    <Text>Me gusta</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={style.botonDeslike} onPress={()=>this.deslikeando()}>
                    <Text>Deslikear</Text>
                </TouchableOpacity>
                }
            <Text>Likes: {this.state.likes}</Text>
            {this.props.comments.length == 0?
            <View>
            <Text>No hay comentarios en esta publicacion. Podes ser el primero!</Text>
            <TouchableOpacity onPress={()=>this.verComentarios()}><Text>Comentá</Text></TouchableOpacity>
                </View>
            :
            
            <TouchableOpacity onPress={()=>this.verComentarios()}><Text>Ver comentarios</Text></TouchableOpacity>
            }
            {this.state.showModal?
            <Modal visible={this.state.showModal} animationType="fade" transparent={false}>

            <Text>Comentarios: </Text>
            <FlatList 
            data = {this.props.comments}
            keyExtractor = {item => item.toString()}
            renderItem = {({item}) => <View style={style.container}>
                <Text>Comentario: {item.comment}
                    Usuario: {item.owner}</Text></View>}
            />
            <TextInput
                    style={style.field}
                    keyboardType='default'
                    placeholder="Ingresa tu comentario"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comments: text })}
                    value = {this.state.comments}
                    />
                    {this.state.comments == ""?
                     <TouchableOpacity style={style.botonLikeGris}>
                     <Text>Comentar</Text>
                 </TouchableOpacity> :

                 <TouchableOpacity style={style.botonLike} onPress={()=>this.comentando()}>
                    <Text>Comentar</Text>
                </TouchableOpacity>
                    }
           
                
                <TouchableOpacity style={style.botonLike} onPress={()=>this.cerrarModal()}>
                    <Text>Cerrar</Text>
                </TouchableOpacity>   

            </Modal> :
            <Text></Text>
        }
            </View>
        )
    }

}

const style = StyleSheet.create({
    container:{
        textAlign:'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
    },
    botonLike: {
        backgroundColor: '#28a745',
        // paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width: '40%',
        marginTop: 10,
        marginLeft: 104,
        marginBottom: 8
    },
    botonDeslike: {
        backgroundColor: 'red',
        // paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width: '40%',
        marginTop: 10,
        marginLeft: 104,
        marginBottom: 8
    },
    field: {
        paddingVertical: 15,
        paddingHorizontal:10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    imagen: {
        height: 205,
        width: '80%',
        position: 'relative',
        marginLeft: 34
    },

    botonLikeGris: {
        backgroundColor: 'grey',
        // paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width: '40%',
        marginTop: 10,
        marginLeft: 104,
        marginBottom: 8
    }
})