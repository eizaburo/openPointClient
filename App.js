import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

//screens
import Base from './screens/Base';
import SignInOrUp from './screens/SignInOrUp';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Point from './screens/Point';
import News from './screens/News';
import Profile from './screens/Profile';
import DrawerLeft from './screens/DrawerLeft';
import DrawerRight from './screens/DrawerRight';

//SignedOutTop
const SignedOutTop = createStackNavigator(
    {
        SignInOrUp: {
            screen: SignInOrUp,
        },
        SignUp: {
            screen: SignUp,
        }
    },
    {
        initialRouteName: 'SignInOrUp'
    }
);

//SignedInTopTabParts

//stack wrap
const HomeStack = createStackNavigator(
    {
        _Home: {
            screen: Home,
        }
    }
);

const PointStack = createStackNavigator(
    {
        _Point: {
            screen: Point,
        }
    }
);

const NewsStack = createStackNavigator(
    {
        _News: {
            screen: News,
        }
    }
);

const ProfileStack = createStackNavigator(
    {
        _Profile: {
            screen: Profile,
        }
    }
);

//SignedInTop

const SignedInTop = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
        },
        Point: {
            screen: PointStack,
        },
        News: {
            screen: NewsStack,
        },
        Profile: {
            screen: ProfileStack,
        },
    }
);

const LeftDrawer = createDrawerNavigator(
    {
        Left: SignedInTop,
    },
    {
        contentComponent: DrawerLeft,
        drawerPosition: 'left',
    }
);

const RightDrawer = createDrawerNavigator(
    {
        Right: LeftDrawer,
    },
    {
        contentComponent: DrawerRight,
        drawerPosition: 'right',
    }
);


const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: { screen: RightDrawer },
            SignedOut: { screen: SignedOutTop }
        },
        {
            initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
        }
    );
}

export default class App extends React.Component {
    render() {

        const AppContainer = createAppContainer(createRootNavigator(false));

        return (
            <View style={{ flex: 1 }}>
                <AppContainer />
            </View>
        );
    }
}