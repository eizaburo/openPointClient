import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class SignUp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>SignUp</Text>
                <Button
                    title="新規登録"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={() => this.props.navigation.navigate('SignedIn')}
                />
            </View>
        );
    }
}

export default SignUp;