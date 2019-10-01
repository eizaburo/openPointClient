import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button, withTheme } from 'react-native-elements';

//redux
import { connect } from 'react-redux';

//firebase
import Firebase, { db } from '../config/Firebase';
import firebase from 'firebase';

class Mpm extends React.Component {

    handleSendValue = async (uid, value) => {
        // alert(value);
        uid = "IR6db6rlguTKorNNSrWOerIVbmH2";
        const user = await db.collection('users').doc(uid).get();
        const now_point = user.data().point;
        alert(now_point);
    }

    render() {

        //データ受け取り
        let params = '';
        if (this.props.navigation.state.params !== undefined) {
            params = this.props.navigation.state.params;
        }

        return (
            <View style={{ flex: 1 }}>
                <Card title="読取り結果に対する操作">
                    <Input
                        label="読取り内容（ID）"
                        value={params.data}
                        disabled
                        inputStyle={{ fontSize: 16 }}
                        errorMessage="形式が不正です。再度読取りして下さい。"
                    />
                    <Input
                        label="操作ポイント数"
                        value={this.props.userData.user.point.toString()}
                        labelStyle={{ marginTop: 20 }}
                        errorMessage="ポイントが足りません。"
                    />
                    <Button
                        title="ポイントを送る（使う）"
                        buttonStyle={{ marginTop: 20, backgroundColor: this.props.theme.colors.sendValue }}
                        onPress={() => this.handleSendValue(1)}
                    />
                    <Text style={{ margin: 5 }}>※相手に加算され、自分は減算されます。</Text>
                    <Button
                        title="ポイントを受取る（貰う）"
                        buttonStyle={{ marginTop: 20, backgroundColor: this.props.theme.colors.reciveValue }}
                    />
                    <Text style={{ margin: 5 }}>※相手は減算され、自分に加算されます。</Text>
                    <Button
                        title="もう一度読む"
                        buttonStyle={{ marginTop: 20, backgroundColor: this.props.theme.colors.buttonColor3 }}
                        onPress={() => this.props.navigation.navigate('_Scan')}
                    />
                    <Button
                        title="Homeに戻る"
                        buttonStyle={{ marginTop: 20, backgroundColor: this.props.theme.colors.buttonColor3 }}
                        onPress={() => this.props.navigation.navigate('_Home')}
                    />
                </Card>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapStateToProps, null)(withTheme(Mpm));