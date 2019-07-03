import React,{Component} from 'react';

import {createStackNavigator,createAppContainer} from 'react-navigation';
import Home from './Home';
import Login from './Login';
import Register from './Register'
import Main from './Main'

export default class App extends Component {
    render(){
        return <AppContainer/>;
    }
};

const RootStack = createStackNavigator({
    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Main: {
            screen: Main
    },
});

const AppContainer = createAppContainer(RootStack);