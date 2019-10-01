import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button, withTheme } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updatePoint } from '../actions/user';

//firebase
import Firebase, { db } from '../config/Firebase';
import firebase from 'firebase';

//formik yup
import { Formik } from 'formik';
import * as Yup from 'yup';
import { now } from 'moment';

class Mpm extends React.Component {

    state = {
        send_spinner: false,
        recive_spinner: false,
    }

    handleOnSubmit = async (values) => {

        //パラメター取得・設定
        const myUid = this.props.userData.user.uid;
        const yourUid = values.uid;
        const myDocRef = db.collection('users').doc(myUid);
        const yourDocRef = db.collection('users').doc(yourUid);

        const yourDoc = await yourDocRef.get();
        const yourNowPoint = yourDoc.data().point;

        const myDoc = await myDocRef.get();
        const myNowPoint = myDoc.data().point;

        //送信処理
        if (values.operation === "SEND") {
            //spinner on
            this.setState({ send_spinner: true });

            //相手の加算処理
            const yourNewPoint = Number(yourNowPoint) + Number(values.point);
            await yourDocRef.update({ point: yourNewPoint });

            //自分の減算処理
            const myNewPoint = Number(myNowPoint) - Number(values.point);
            await myDocRef.update({ point: myNewPoint });

            //トランザクション情報書き込み
            const tran = await db.collection('transactions').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                operation: values.operation,
                to: yourUid,
                from: myUid,
                point: values.point,
                myNowPoint: myNowPoint,
                myNewPoint: myNewPoint,
                yourNowPoint: yourNowPoint,
                yourNewPoint: yourNewPoint,
            });

            //表示更新
            this.props.updatePoint(myNewPoint);

            //spinner off
            this.setState({ send_spinner: false });

            //alert
            alert("処理完了:" + tran.id);
        }
        //受信処理
        if (values.operation === "RECIVE") {

            //spinner on
            this.setState({ recive_spinner: true });

            //相手の減算処理
            const yourNewPoint = Number(yourNowPoint) - Number(values.point);
            await yourDocRef.update({ point: yourNewPoint });

            //自分の加算処理
            const myNewPoint = Number(myNowPoint) + Number(values.point);
            await myDocRef.update({ point: myNewPoint });

            //トランザクション情報書き込み
            const tran = await db.collection('transactions').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                operation: values.operation,
                to: myUid,
                from: yourUid,
                point: values.point,
                myNowPoint: myNowPoint,
                myNewPoint: myNewPoint,
                yourNowPoint: yourNowPoint,
                yourNewPoint: yourNewPoint,
            });

            //表示更新
            this.props.updatePoint(myNewPoint);

            //spinner off
            this.setState({ recive_spinner: false });

            //alert
            alert("処理完了:" + tran.id);

        }

        //その他
        if (values.operation === "nothing") {
            alert("処理が行えません。");
        }
    }

    render() {

        //データ受け取り
        let params = '';
        if (this.props.navigation.state.params !== undefined) {
            params = this.props.navigation.state.params;
        }

        return (
            <View style={{ flex: 1 }}>
                <Formik
                    initialValues={{ uid: params.data, point: 10, operation: 'nothing' }}
                    onSubmit={values => this.handleOnSubmit(values)}
                    validationSchema={Yup.object().shape({
                        uid: Yup.string().min(10, '不正です。').max(30, '不正です。').required(),
                        point: Yup.string().matches(/^[1-9][0-9]{0,3}$/, '1以上9999以下の数字を入力して下さい。').required(),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, touched, setValues }) => (
                            <Card title="読取り結果に対する操作">
                                <Input
                                    label="読取り内容（ID）"
                                    value={params.data}
                                    disabled
                                    inputStyle={{ fontSize: 16 }}
                                    errorMessage={errors.uid && errors.uid}
                                />
                                <Input
                                    label="操作ポイント数"
                                    value={values.point.toString()}
                                    labelStyle={{ marginTop: 20 }}
                                    autoCapitalize="none"
                                    onChangeText={handleChange('point')}
                                    errorMessage={errors.point && errors.point}
                                />
                                <Text style={{ marginLeft: 10 }}>現在のポイント残：{this.props.userData.user.point}pt</Text>
                                <Button
                                    title="ポイントを送る（使う）"
                                    buttonStyle={{ marginTop: 20, backgroundColor: this.props.theme.colors.sendValue }}
                                    onPress={() => {
                                        values.operation = "SEND";
                                        handleSubmit();
                                    }}
                                    loading={this.state.send_spinner}
                                />
                                <Text style={{ margin: 5 }}>※相手に加算され、自分は減算されます。</Text>
                                <Button
                                    title="ポイントを受取る（貰う）"
                                    buttonStyle={{ marginTop: 20, backgroundColor: this.props.theme.colors.reciveValue }}
                                    onPress={() => {
                                        values.operation = "RECIVE";
                                        handleSubmit();
                                    }}
                                    loading={this.state.recive_spinner}
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
                        )
                    }
                </Formik>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        userData: state.userData,
    }
);

const mapDispatchToProps = dispatch => (
    {
        updatePoint: point => dispatch(updatePoint(point)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Mpm));