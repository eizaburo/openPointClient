import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import { connect } from 'react-redux';
import { updateEmail } from '../actions/user';

class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableHighlight
                    style={{
                        marginTop: 20,
                    }}
                    underlayColor="#fff"
                    onPress={() => alert("press")}
                >
                    <LinearGradient
                        colors={['#393FFF', '#44A5FF']}
                        style={{ height: 200, width: 320, borderRadius: 10 }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                position: "absolute",
                                top: 30,
                                left: 30,
                                fontSize: 12,
                            }}
                        >
                            会員UID：{this.props.userData.user.uid}
                        </Text>
                        <Text
                            style={{
                                color: "#fff",
                                position: "absolute",
                                top: 60,
                                left: 30,
                                fontSize: 12,
                            }}
                        >
                            会員EMail：{this.props.userData.user.email}
                        </Text>
                        <Text
                            style={{
                                color: "#fff",
                                position: "absolute",
                                top: 90,
                                left: 30,
                                fontSize: 12,
                            }}
                        >
                            現在有効なポイント残高
                        </Text>
                        <Text
                            style={{
                                color: "#fff",
                                position: "absolute",
                                top: 130,
                                right: 40,
                                fontSize: 24,
                            }}
                        >
                            {this.props.userData.user.point}pt
                        </Text>
                    </LinearGradient>
                </TouchableHighlight>
                <View
                    style={{ flexDirection: "row" }}
                >
                    <View style={{ backgroundColor: "#fff", flex: 1 }}>
                        <Button
                            type="outline"
                            title="QRを表示する"
                            containerStyle={{
                                marginVertical: 20,
                                marginLeft: 30,
                                marginRight: 10,
                            }}
                            buttonStyle={{ height: 60, borderWidth: 1 }}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", flex: 1 }}>
                        <Button
                            type="outline"
                            title="QRを読み取る"
                            containerStyle={{
                                marginVertical: 20,
                                marginLeft: 10,
                                marginRight: 30,
                            }}
                            buttonStyle={{ height: 60, borderWidth: 1 }}
                        />
                    </View>
                </View>
                <View style={{ alignSelf: "stretch" }}>
                    <Button
                        type="outline"
                        title="履歴を見る"
                        containerStyle={{ marginHorizontal: 30 }}
                        buttonStyle={{ height: 60, borderWidth: 1 }}
                    />
                </View>
            </View>
        );
    }
}

const mapPropsToState = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapPropsToState, null)(Home);
// export default Home;