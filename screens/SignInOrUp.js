import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class SignInOrUp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>SignInOrUp</Text>
                <Button
                    title="ログイン"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={() => this.props.navigation.navigate('SignedIn')}
                />
                <Button
                    title="新規登録"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }
}

export default SignInOrUp;