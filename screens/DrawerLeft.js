import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//firebase
import Firebase from '../config/Firebase';

class DrawerLeft extends React.Component {

    handleSignOut = async () => {
        await Firebase.auth().signOut();
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>DrawerLeft</Text>
                <Button
                    title="ログアウト"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}

export default DrawerLeft;