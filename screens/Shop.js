import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Linking } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import MapView, { Circle } from 'react-native-maps';

class Shop extends React.Component {
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 35.693429,
                    longitude: 139.7602345,
                    latitudeDelta: 0.01, //小さくなるほどズーム
                    longitudeDelta: 0.01,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: 35.69422,
                        longitude: 139.7591703,
                    }}
                    title={"ロイヤルホスト"}
                    description={"神保町出口すぐ。"}
                    onPress={() => Linking.openURL('https://tabelog.com/tokyo/A1310/A131003/13101053/')}
                />
                <Circle
                    center={{
                        latitude: 35.693429,
                        longitude: 139.7602345
                    }}
                    radius={500}
                    fillColor="rgba(200, 0, 0, 0.5)"
                    strokeColor="rgba(200, 0, 0, 0.5)"
                />
            </MapView>
        );
    }
}

export default Shop;