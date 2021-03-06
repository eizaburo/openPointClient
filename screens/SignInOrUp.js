import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateEmail, updatePassword, updateConfirm, signIn, clearAll } from '../actions/user';

//formik, yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//firebase
import Firebase from '../config/Firebase';

class SignInOrUp extends React.Component {

    state = {
        loading: false,
    }

    handleSignIn = async (email, password) => {
        try {
            this.setState({ loading: true });
            //store
            this.props.updateEmail(email);
            this.props.updatePassword(password);

            //login
            await this.props.signIn();
        } catch (e) {
            this.setState({ loading: false });
            console.log(e);
        }
    }

    render() {
        // console.log("hoge=" + JSON.stringify(this.props.userData));
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView behavior="position">

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={values => this.handleSignIn(values.email, values.password)}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required(),
                                password: Yup.string().required(),
                            })}
                        >
                            {
                                ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                    <Card
                                        title="ログイン"
                                        containerStyle={{ marginTop: 20 }}
                                    >
                                        <Input
                                            label="Email"
                                            labelStyle={{ marginTop: 10 }}
                                            autoCapitalize="none"
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            errorMessage={errors.email && touched.email ? errors.email : null}
                                        />
                                        <Input
                                            label="パスワード"
                                            labelStyle={{ marginTop: 10 }}
                                            secureTextEntry
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            errorMessage={errors.password && touched.password ? errors.password : null}
                                        />
                                        <Button
                                            title="ログイン"
                                            buttonStyle={{ marginTop: 20 }}
                                            onPress={handleSubmit}
                                            loading={this.state.loading}
                                        />
                                        <Button
                                            title="新規登録はこちら"
                                            buttonStyle={{ marginTop: 20, backgroundColor: "#3cb371" }}
                                            onPress={() => this.props.navigation.navigate('SignUp')}
                                        />
                                    </Card>
                                )
                            }
                        </Formik>
                    </KeyboardAvoidingView>
                </View >
            </ScrollView>
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
        signIn: () => dispatch(signIn()),
        clearAll: () => dispatch(clearAll()),
    }
);

// export default SignInOrUp;
export default connect(mapStateToProps, mapDispatchToProps)(SignInOrUp);