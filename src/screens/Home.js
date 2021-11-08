import React, { Component } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Post from "../components/Post";
import { db } from "../firebase/config";

const styles = StyleSheet.create({
    clickeame: {
        backgroundColor: '#ccc',
        padding: 4,
        marginBottom: 10,
        borderRadius: 4,
        fontWeight: "bold"
    },
    container:{
        textAlign:'center',
        padding: 10
    },
    image1: {
        height: 250
    }
})

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
                    posts: posts
                })
            }
        )
    }

    
    render(){
        return(
            <View style={styles.container}>
                <FlatList 
                data = {this.state.posts}
                keyExtractor = {item => item.id.toString()}
                renderItem = { ({item}) => <Post 
                description = {item.data.description}
                createdAt = {item.data.createdAt}
                owner = {item.data.owner}
                id = {item.id}
                likes = {item.data.likes}
                photo = {item.data.photo}
                />}
                />
                
            </View>
        )
    }
    
    
}
