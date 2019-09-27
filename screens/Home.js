import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateEmail } from '../actions/user';

class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home</Text>
            </View>
        );
    }
}

const mapPropsToState = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapPropsToState, null)(Home);
// export default Home;