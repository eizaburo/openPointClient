import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

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
import Terms from './screens/Terms';
import DrawerLeftScreen from './screens/DrawerLeft';
import DrawerRightScreen from './screens/DrawerRight';
import Cpm from './screens/Cpm';
import Mpm from './screens/Mpm';
import History from './screens/History';
import Scan from './screens/Scan';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

//redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import { getUser } from './actions/user';

//firebase
import Firebase from './config/Firebase';

//SignedOutTop
const SignedOutTop = createStackNavigator(
    {
        SignInOrUp: {
            screen: SignInOrUp,
        },
        SignUp: {
            screen: SignUp,
        },
        Terms: {
            screen: Terms,
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
            navigationOptions: ({ navigation }) => ({
                headerLeft: (<Icon name="bars" size={24} onPress={() => alert("左ボタン")} style={{ paddingLeft: 20 }} />),
                headerRight: (<Icon name="cog" size={24} onPress={() => alert("右ボタン")} style={{ paddingRight: 20 }} />),
            })
        },
        _Cpm: {
            screen: Cpm,
        },
        _Mpm: {
            screen: Mpm,
        },
        _History: {
            screen: History,
        },
        _Scan: {
            screen: Scan,
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

const HistoryStack = createStackNavigator(
    {
        _History: {
            screen: History,
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
        History: {
            screen: HistoryStack,
            navigationOptions: {
                title: '履歴',
                tabBarIcon: ({ tintColor }) => <Icon5 size={24} name="receipt" color={tintColor} />
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

//createStore
const store = createStore(combineReducers({
    userData: userReducer,
}), applyMiddleware(
    thunk,
));

//theme

const theme = {
    colors: {
        buttonColor1: '#2089dc',
        buttonColor2: '#3cb371',
        buttonColor3: '#708090',
        sendValue: '#4169e1',
        reciveValue: '#ff69b4',
    }
}

export default class App extends React.Component {

    constructor(props) {
        super(props);

        //AndroidでのWarning対応
        // global.__old_console_warn = global.__old_console_warn || console.warn;
        // global.console.warn = (...args) => {
        //     let tst = (args[0] || '') + '';
        //     if (tst.startsWith('Setting a timer')) {
        //         return;
        //     }
        //     return global.__old_console_warn.apply(console, args);
        // };
    }

    state = {
        signedIn: false,
        checkSignIn: false,
    }

    componentDidMount = () => {

        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                store.dispatch(getUser(user.uid));
                if (store.getState().userData.user != null) {
                    this.setState({
                        signedIn: true,
                        checkSignIn: true,
                    });
                } else {
                    this.setState({
                        signedIn: false,
                        checkSignIn: true,
                    });
                }
            } else {
                this.setState({
                    signedIn: false,
                    checkSignIn: true,
                });
            }
        });

    }

    render() {

        // console.log(store.getState());

        const { checkSignIn, signedIn } = this.state;

        if (!checkSignIn) {
            return null;
        }

        const AppContainer = createAppContainer(createRootNavigator(signedIn));
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppContainer />
                </ThemeProvider>
            </Provider>
        );
    }
}