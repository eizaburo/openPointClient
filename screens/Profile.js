import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile</Text>
                <Button
                    title="ログアウト"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={() => this.props.navigation.navigate('SignedOut')}
                />
            </View>
        );
    }
}

export default Profile;