import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//firebase
import Firebase from '../config/Firebase';

class Profile extends React.Component {

    handleSignOut = () => {
        Firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('SignedOut'))
            .catch(e => console.log("firebase signout error:" + e))
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile</Text>
                <Button
                    title="ログアウト"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}

export default Profile;