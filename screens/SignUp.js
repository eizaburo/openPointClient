import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class SignUp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Card
                    title="新規登録"
                    containerStyle={{ marginTop: 20 }}
                >
                    <Input
                        label="Email（必須）"
                        labelStyle={{ marginTop: 10 }}
                        autoCapitalize="none"
                    />
                    <Input
                        label="パスワード（必須）"
                        labelStyle={{ marginTop: 10 }}
                        secureTextEntry
                    />
                    <Input
                        label="パスワード再確認（必須）"
                        labelStyle={{ marginTop: 10 }}
                        secureTextEntry
                    />
                    <Input
                        label="電話番号（オプション）"
                        labelStyle={{ marginTop: 10 }}
                        autoCapitalize="none"
                    />
                    <Button
                        title="新規登録"
                        buttonStyle={{ marginTop: 20, backgroundColor: "#3cb371" }}
                        onPress={() => this.props.navigation.navigate('SignedIn')}
                    />
                </Card>
            </View>
        );
    }
}

export default SignUp;