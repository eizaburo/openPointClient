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
import DrawerLeftScreen from './screens/DrawerLeft';
import DrawerRightScreen from './screens/DrawerRight';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';

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
            navigationOptions: {
                title: 'ホーム',
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />
            }
        },
        Point: {
            screen: PointStack,
            title: 'ポイント',
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="product-hunt" color={tintColor} />
            }
        },
        News: {
            screen: NewsStack,
            navigationOptions: {
                title: 'お知らせ',
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="info-circle" color={tintColor} />
            }
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                title: '設定',
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="user" color={tintColor} />
            }
        },
    }
);

const DrawerLeft = createDrawerNavigator(
    {
        Left: SignedInTop,
    },
    {
        contentComponent: DrawerLeftScreen,
        drawerPosition: 'left',
    }
);

const DrawerRight = createDrawerNavigator(
    {
        Right: DrawerLeft,
    },
    {
        contentComponent: DrawerRightScreen,
        drawerPosition: 'right',
    }
);


const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: { screen: DrawerRight },
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