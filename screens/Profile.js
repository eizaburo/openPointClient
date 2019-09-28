import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//firebase
import Firebase from '../config/Firebase';

//redux
import { connect } from 'react-redux';

//moment
import moment from 'moment';

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
                {/* moment(seconds * 1000).add(9,'hours').format('YYYY/MM/DD HH:mm:ss') */}
                <Text>登録日時:{moment(this.props.userData.user.createdAt.seconds*1000).format('YYYY/MM/DD HH:mm:ss')}</Text>
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