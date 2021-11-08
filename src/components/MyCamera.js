import { Camera } from "expo-camera";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { storage } from "../firebase/config";

export default class MyCamera extends Component{
    constructor(props){
        super(props)
        this.camera
        this.state ={
            photo: '',
            permission: false,
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(response => {
            console.log(response);
            this.setState({
                permission: response.granted
            })
        })
    }

    takePicture(){
        if(!this.camera) return
        this.camera.takePictureAsync()
        .then(photo => {
            this.setState({
                photo: photo.uri,
            })
        })
    }

    savePhoto(){
        fetch(this.state.photo)
        .then(res=>res.blob())
        .then(image => {
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then (url => {
                    this.props.onImageUpload(url)
                    this.setState({
                        photo: ''
                    })
                })
            })
        })
        .catch(e=>console.log(e))
    }

    clearPhoto(){
        this.setState({
            photo: ''
        })
    }

    render(){
        console.log(this.state);
        return(
            <>
                {this.state.photo ?
                <React.Fragment>
            <Image 
            // style={styles.preview}
            source={{uri:this.state.photo}}
            />
            <View>
                <TouchableOpacity onPress={()=>this.savePhoto()}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.clearPhoto()}>
                    <Text>Rechazar</Text>
                </TouchableOpacity>
            </View>
              </React.Fragment>
              :
                <React.Fragment>
                <Camera
                style={styles.cameraBody}
                type={Camera.Constants.Type.front}
                ref={reference => this.camera = reference}
                />
                <TouchableOpacity 
                onPress={()=>this.takePicture()}>
                    <Text>Shoot</Text>
                </TouchableOpacity>
                </React.Fragment>
            }
            </>
        )
    }

}

const styles = StyleSheet.create({
    preview: {},
    cameraBody:{
        flex: 1,
        width: '100%'
    }
})