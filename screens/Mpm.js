import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class Mpm extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Mpm</Text>
                <Button
                    title="読み取り開始"
                    onPress={() => this.props.navigation.navigate('_Scan')}
                />
            </View>
        );
    }
}

export default Mpm;