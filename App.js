import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';

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
import Shop from './screens/Shop';
import Exchange from './screens/Exchange';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

//redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import { getUser, updatePoint } from './actions/user';

//firebase
import Firebase, { db } from './config/Firebase';

//badge
import IconBadge from 'react-native-icon-badge';

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
                title: 'Open Point Clinet',
                headerTitleStyle: { color: "#666", fontWeight: "normal", fontSize:14 },
                headerLeft: (<Icon name="bars" size={24} onPress={() => navigation.toggleLeftDrawer()} style={{ paddingLeft: 20 }} />),
                headerRight: (<Icon name="cog" size={24} onPress={() => navigation.toggleRightDrawer()} style={{ paddingRight: 20 }} />),
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
        },
        _Shop: {
            screen: Shop,
        },
        _Exchange: {
            screen: Exchange,
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#eee",
            },
        }),
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
                // tabBarIcon: ({ tintColor }) => <Icon size={24} name="info-circle" color={tintColor} />
                //タブクリックイベントを実装
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    console.log("news tab click.");
                    defaultHandler();
                },
                tabBarIcon: ({ tintColor }) => (
                    <IconBadge
                        MainElement={
                            <Icon size={24} name="info-circle" color={tintColor} />
                        }
                        BadgeElement={
                            <Text style={{ color: "#fff" }}></Text>
                        }
                        IconBadgeStyle={{
                            height: 11,
                            width: 11,
                            position: 'absolute',
                            minWidth: 5,
                            top: 0,
                            right: 0
                        }}
                        Hidden={false}
                    />
                )

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
        getCustomActionCreators: (route, stateKey) => {
            // console.log("LEFT" + stateKey);
            return {
                toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
            };
        },
    }
);

const DrawerRight = createDrawerNavigator(
    {
        Right: DrawerLeft,
    },
    {
        contentComponent: DrawerRightScreen,
        drawerPosition: 'right',
        getCustomActionCreators: (route, stateKey) => {
            // console.log("RIGHT" + stateKey)
            return {
                toggleRightDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
            };
        },
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
        global.__old_console_warn = global.__old_console_warn || console.warn;
        global.console.warn = (...args) => {
            let tst = (args[0] || '') + '';
            if (tst.startsWith('Setting a timer')) {
                return;
            }
            return global.__old_console_warn.apply(console, args);
        };
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

                    //サブスクライブ（自分のDocを監視）
                    this.docRef = db.collection('users').doc(user.uid);
                    this.doc_unsubscribe = this.docRef.onSnapshot(this.onDocumentUpdate);

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

    onDocumentUpdate = (querySnapShot) => {
        //最初に一度実行されてしまう・・・
        // console.log(querySnapShot.data());
        store.dispatch(updatePoint(querySnapShot.data().point));
    }

    componentWillUnmount = () => {
        //実行されない
        console.log('unsubscribe');
        this.doc_unsubscribe.remove(); //
    }

    render() {

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