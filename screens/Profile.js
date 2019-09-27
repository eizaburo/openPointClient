import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//firebase
import Firebase from '../config/Firebase';

//redux
import { connect } from 'react-redux';

class Profile extends React.Component {

    state = {
        loading: false,
    }

    handleSignOut = () => {
        this.setState({ loading: true });
        Firebase.auth().signOut()
            .then(() => {
                this.setState({ loading: false });
                this.props.navigation.navigate('SignedOut');
            })
            .catch(e => {
                this.setState({ loading: false });
                console.log("firebase signout error:" + e);
            })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile</Text>
                <Text>email:{this.props.userData.user.email}</Text>
                <Text>point:{this.props.userData.user.point}</Text>
                <Button
                    title="ログアウト"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={this.handleSignOut}
                    loading={this.state.loading}
                />
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapStateToProps, null)(Profile);
// export default Profile;