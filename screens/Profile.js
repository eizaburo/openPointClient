import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Card, Input, Button, ListItem, Avatar } from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

//firebase
import Firebase from '../config/Firebase';

//redux
import { connect } from 'react-redux';

//moment
import moment from 'moment';

//pedometer
import { Pedometer } from "expo-sensors";

class Profile extends React.Component {

    state = {
        loading: false,
        walking: 0,
    }

    handleSignOut = () => {
        this.setState({ loading: true });
        Firebase.auth().signOut()
            .then(() => {
                this.setState({ loading: false });
                this.props.navigation.navigate('SignedOut');
            })
            .catch(e => {
                this.setState({ loading: false });
                console.log("firebase signout error:" + e);
            })
    }

    pedometerSubscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({ walking: result.steps });
        });
    }

    componentDidMount = () => {
        this.pedometerSubscribe();
    }

    componentWillUnmount = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#eee" }}>
                <ScrollView>
                    <View style={{ marginVertical: 40, alignItems: 'center' }}>
                        <Avatar
                            size="large"
                            title="OP"
                            source={{ uri: "http://www.bluecode.jp/images/shiro.jpg" }}
                            rounded
                            onPress={() => alert("変更しますか?")}
                        />
                    </View>
                    <Text style={{ alignSelf: 'center', marginBottom: 20 }}>基本情報</Text>
                    <View style={{ marginTop: 0, width: '100%', alignSelf: 'center' }}>
                        <ListItem
                            title={this.props.userData.user.uid}
                            leftIcon={<Icon5 name={'id-card'} size={20} color="#00bfff" />}
                            bottomDivider
                            titleStyle={{ color: "#aaa", fontSize: 16 }}
                        />
                        <ListItem
                            title={this.props.userData.user.email}
                            leftIcon={<Icon5 name={'envelope'} size={20} color="#66cdaa" />}
                            bottomDivider
                            chevron
                            onPress={() => alert("EMail")}
                        />
                        <ListItem
                            title={'TEL:'}
                            leftIcon={<Icon5 name={'phone'} size={20} color="#ffd700" />}
                            bottomDivider
                            chevron
                            onPress={() => alert("Phone")}
                        />
                        <Text style={{ alignSelf: 'center', margin: 20 }}>拡張情報</Text>
                        <ListItem
                            title={this.props.userData.user.point.toString() + " pt"}
                            leftIcon={<Icon5 name={'product-hunt'} size={20} color="#ff69b4" />}
                            bottomDivider
                            titleStyle={{ color: "#aaa", fontSize: 16 }}
                        />
                        <ListItem
                            title={this.state.walking.toString() + " 歩"}
                            leftIcon={<Icon5 name={'walking'} size={20} color="#8b008b" />}
                            bottomDivider
                            titleStyle={{ color: "#aaa", fontSize: 16 }}
                        />
                        <Text style={{ alignSelf: 'center', margin: 20 }}>その他</Text>
                        <Button
                            title="ログアウト"
                            buttonStyle={{ width: 300, alignSelf: 'center' }}
                            onPress={this.handleSignOut}
                            loading={this.state.loading}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapStateToProps, null)(Profile);
// export default Profile;