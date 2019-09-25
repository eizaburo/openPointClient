import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default class Base extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Base</Text>
            </SafeAreaView>
        );
    }
}