import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Linking } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

//redux
import { connect } from 'react-redux';

class Exchange extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#eee" }}>
                <View style={{ alignSelf: 'stretch', backgroundColor: "#ddd", padding: 20, alignItems: 'center' }}>
                    <Text>交換元リスト</Text>
                </View>

                {/* <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                    <Image source={require('../assets/bankofchina.png')} resizeMode="contain" style={{ height: 40, width: 100, marginLeft: 20 }} />
                    <Text >1,200 pt</Text>
                    <Text style={{ marginRight: 20 }}>選択する</Text>
                </View> */}

                <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                    <Image source={require('../assets/chinamobile.png')} resizeMode="contain" style={{ height: 40, width: 100, marginLeft: 20 }} />
                    <Text >56,921 pt</Text>
                    <Text style={{ marginRight: 20 }}>選択する</Text>
                </View>

                <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                    <Image source={require('../assets/chinaeastern.png')} resizeMode="contain" style={{ height: 40, width: 100, marginLeft: 20 }} />
                    <Text >同期未設定</Text>
                    {/* <Text style={{ marginRight: 20 }}>選択する</Text> */}
                    <Button
                        title="同期設定"
                        titleStyle={{ fontSize: 12 }}
                        onPress={() => Linking.openURL('http://www.chinaeastern-air.co.jp/mileage/index.html')}
                    />
                </View>

                <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                    <Image source={require('../assets/mynumber.png')} resizeMode="contain" style={{ height: 40, width: 100, marginLeft: 20 }} />
                    <Text >12,500 pt</Text>
                    <Text style={{ marginRight: 20 }}>選択する</Text>
                </View>

                <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                    <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon5 name={'walking'} size={20} color="#8b008b" />
                        <Text style={{ marginLeft: 5 }}>Walking Point</Text>
                    </View>
                    {/* <Text >{this.props.userData.user.walking.toString() + " 歩"}</Text> */}
                    <Text >{0 + " 歩"}</Text>
                    <Text style={{ marginRight: 20 }}>選択する</Text>
                </View>

                <View style={{ alignSelf: 'stretch', backgroundColor: "#ddd", padding: 20, alignItems: 'center' }}>
                    <Text>交換先リスト</Text>
                </View>

                <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                    <Image source={require('../assets/waonpoint.png')} resizeMode="contain" style={{ height: 40, width: 100, marginLeft: 20 }} />
                    <Text >0 pt</Text>
                    <Text style={{ marginRight: 20 }}>選択済み</Text>
                </View>
                <Button
                    title="交換する"
                    buttonStyle={{ width: 300, alignSelf: 'center', marginTop: 30 }}
                    onPress={() => alert('交換')}
                />
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapStateToProps, null)(Exchange);