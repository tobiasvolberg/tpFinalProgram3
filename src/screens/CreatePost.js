import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { auth, db } from '../firebase/config'

export default class CreatePost extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment: ''
        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            email: auth.currentUser.email
        })
        .then(response => {
            console.log(response);
            alert('posteo realizado')
            this.setState({
                comment: ''
            })
            this.props.navigation.navigate('Home')
        })
        .catch(e => {
            console.log(e);
            alert('hubo un error')
        })
    }

    render(){
        return(
            <View style={style.container}>
            <TextInput
                    style={style.field}
                    keyboardType='default'
                    placeholder="What are you thinking?"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
            <TouchableOpacity onPress={()=>this.handlePost()} style ={style.boton}>
            <Text>Postea!</Text>
            </TouchableOpacity>
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
    field: {
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
    }
})