import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class Mpm extends React.Component {
    render() {
        console.log(this.props.navigation.state);
        let params = '';
        if(this.props.navigation.state.params !== undefined){
            params = this.props.navigation.state.params;
        }

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Mpm</Text>
                <Text>読み取りデータ：{params.data}</Text>
                <Button
                    title="もう一度読み取る"
                    onPress={() => this.props.navigation.navigate('_Scan')}
                />
            </View>
        );
    }
}

export default Mpm;