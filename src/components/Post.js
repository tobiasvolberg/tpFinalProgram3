import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from 'firebase';


export default class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            likes: 0,
            liked: false
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
    render(){
        console.log(this.props);
        return(
            <View style = {style.container}>
                <Text>Comentario: {this.props.description}</Text>
                <Text>Dia creado: {this.props.createdAt}</Text>
                <Text>Usuario: {this.props.owner}</Text>
                {this.state.liked === false ?
                <TouchableOpacity style={style.botonLike} onPress={()=>this.likeando()}>
                    <Text>Me gusta</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={style.botonDeslike} onPress={()=>this.deslikeando()}>
                    <Text>Deslikear</Text>
                </TouchableOpacity>
            }
            <Text>Likes: {this.state.likes}</Text>
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
    }
})