import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Card, Input, Button, CheckBox } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateEmail, updatePassword, updateConfirm, updateTel, signUp } from '../actions/user';

//formik, yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//firebase
import Firebase from '../config/Firebase';

class SignUp extends React.Component {

    handleSignUp = (email, password) => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('SignedIn'))
            .catch(e => console.log("firebase signup error:" + e));
    }

    render() {
        // console.log(this.props.userData);
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior="position">
                    <ScrollView>
                        <Formik
                            initialValues={{ email: '', password: '', confirm: '', tel: '', check: false }}
                            onSubmit={values => this.handleSignUp(values.email, values.password)}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required(),
                                password: Yup
                                    .string()
                                    .min(6, '半角英数で6文字以上にしてください。')
                                    .max(16, '16文字以下にしてください。')
                                    .required(),
                                confirm: Yup.string().oneOf([Yup.ref('password')], 'パスワードが一致しません。').required(),
                                tel: Yup.string().matches(/^[0-9]+$/, { message: '電話の形式が違います。' }),
                                check: Yup.boolean().oneOf([true], '同意して下さい。'),
                            })}
                        >
                            {
                                ({ handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue }) => (
                                    <Card
                                        title="新規登録"
                                        containerStyle={{ marginTop: 20 }}
                                    >
                                        <Input
                                            label="Email（必須）"
                                            labelStyle={{ marginTop: 10 }}
                                            autoCapitalize="none"
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            errorMessage={errors.email && touched.email ? errors.email : null}

                                        />
                                        <Input
                                            label="パスワード（必須）"
                                            labelStyle={{ marginTop: 10 }}
                                            secureTextEntry
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            errorMessage={errors.password && touched.password ? errors.password : null}
                                        />
                                        <Input
                                            label="パスワード再確認（必須）"
                                            labelStyle={{ marginTop: 10 }}
                                            secureTextEntry
                                            value={values.confirm}
                                            onChangeText={handleChange('confirm')}
                                            onBlur={handleBlur('confirm')}
                                            errorMessage={errors.confirm && touched.confirm ? errors.confirm : null}
                                        />
                                        <Input
                                            label="携帯電話番号（オプション）"
                                            labelStyle={{ marginTop: 10 }}
                                            autoCapitalize="none"
                                            value={values.tel}
                                            onChangeText={handleChange('tel')}
                                            onBlur={handleBlur('tel')}
                                            errorMessage={errors.tel && touched.tel ? errors.tel : null}
                                        />
                                        <Button
                                            type="clear"
                                            title="規約を読む"
                                            buttonStyle={{marginTop:15}}
                                            // titleStyle={{fontSize:9}}
                                            onPress={()=>this.props.navigation.navigate('Terms')}
                                        />
                                        <CheckBox
                                            center
                                            title="同意する"
                                            containerStyle={{ marginTop: 10, borderColor: "#fff", backgroundColor: "#fff" }}
                                            checked={values.check}
                                            onPress={() => setFieldValue('check', !values.check)}
                                        />
                                        <Text style={{ alignSelf: 'center', color: 'red', fontSize: 12 }}>
                                            {errors.check && touched.check ? errors.check : null}
                                        </Text>
                                        <Button
                                            title="新規登録"
                                            buttonStyle={{ marginTop: 10, backgroundColor: "#3cb371" }}
                                            onPress={handleSubmit}
                                        />
                                    </Card>
                                )
                            }
                        </Formik>
                        {/* ScrollViewで途切れ防止 */}
                        {/* <View style={{ flex: 1, marginBottom: 300 }}></View> */}
                    </ScrollView>
                </KeyboardAvoidingView>
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
        updateEmail: email => dispatch(updateEmail(email)),
        updatePassword: password => dispatch(updatePassword(password)),
        updateConfirm: confirm => dispatch(updateConfirm(confirm)),
        updateTel: tel => dispatch(updateTel(tel)),
        signUp: () => dispatch(signUp()),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp;