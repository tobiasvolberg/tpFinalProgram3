import { Camera } from "expo-camera";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { storage } from "../firebase/config";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BUTTON_SIZE = 30
const BORDER_WIDTH = 1

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
            <View style={styles.containerBotones}>
                <TouchableOpacity onPress={()=>this.savePhoto()} style={styles.botonAceptar}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.clearPhoto()} style={styles.botonRechazar}>
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
                onPress={()=>this.takePicture()} style={styles.containerIcon}>
                    <Icon name={'camera'} size={BUTTON_SIZE} />
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
    },
    containerIcon:{position:'relative', right:'-45%'},
    containerBotones:{paddingTop:'5%'},
    button:{
        justifyContent:'center',
        alignItems:'center',
        width:BUTTON_SIZE+BORDER_WIDTH,
        height:BUTTON_SIZE+BORDER_WIDTH,
        borderWidth:BORDER_WIDTH,
        borderRadius:BUTTON_SIZE/2,
        position: 'relative',
        right: '-90%',
    },
    botonAceptar: {
        backgroundColor: '#28a745',
        // paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'grey',
        width: '40%',
        marginTop: 10,
        marginLeft: 104,
        marginBottom: 8,
        position: 'relative',
        top: -14,
        right: -12
    },
    botonRechazar: {
        backgroundColor: 'red',
        // paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
        width: '40%',
        marginTop: 10,
        marginLeft: 104,
        marginBottom: 8,
        position: 'relative',
        top: -14,
        right: -12
    }
})