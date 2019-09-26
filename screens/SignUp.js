import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

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
                <Formik
                    initialValues={{ email: '', password: '', confirm: '', tel: '' }}
                    onSubmit={values => this.handleSignUp(values.email, values.password)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().required(),
                        confirm: Yup.string().required(),
                        tel: Yup.string()
                    })}
                >
                    {
                        ({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
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
                                    title="新規登録"
                                    buttonStyle={{ marginTop: 20, backgroundColor: "#3cb371" }}
                                    onPress={handleSubmit}
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
        updateEmail: email => dispatch(updateEmail(email)),
        updatePassword: password => dispatch(updatePassword(password)),
        updateConfirm: confirm => dispatch(updateConfirm(confirm)),
        updateTel: tel => dispatch(updateTel(tel)),
        signUp: () => dispatch(signUp()),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp;