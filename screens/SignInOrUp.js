import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class SignInOrUp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Card
                    title="ログイン"
                    containerStyle={{ marginTop: 20 }}
                >
                    <Input
                        label="Email"
                        labelStyle={{ marginTop: 10 }}
                        autoCapitalize="none"
                    />
                    <Input
                        label="パスワード"
                        labelStyle={{ marginTop: 10 }}
                        secureTextEntry
                    />
                    <Button
                        title="ログイン"
                        buttonStyle={{ marginTop: 20 }}
                        onPress={() => this.props.navigation.navigate('SignedIn')}
                    />
                    <Button
                        title="新規登録はこちら"
                        buttonStyle={{ marginTop: 20, backgroundColor: "#3cb371" }}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </Card>
            </View>
        );
    }
}

export default SignInOrUp;