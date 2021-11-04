import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "", 
            error: ''
        }
    }

    

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogin(this.state.email,this.state.password)}>
                    <Text style = {styles.text}> Login </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        textAlign:'center',
        paddingHorizontal: 10,
        marginTop: 20
    },
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
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    text: {
        color: '#fff'
    }
})