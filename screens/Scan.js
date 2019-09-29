import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, SafeAreaViewComponent, Dimensions, DeviceEventEmitter } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

//qr画面計算
const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

class Scan extends React.Component {

    state = {
        hasCameraPermission: null
    }

    componentDidMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    handleScanned = ({ type, data }) => {

        //object型で返さないとおかしくなる
        const scanData = {
            status: 'OK',
            type: type,
            data: data,
        }
        this.props.navigation.navigate('_Mpm', scanData);
    }

    render() {

        //カメラの許可状況を取得
        const { hasCameraPermission } = this.state;

        //取得中
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission...</Text>
        }

        //NGだったら
        if (hasCameraPermission === false) {
            return <Text>No access to camera.</Text>
        }

        //スキャン
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <BarCodeScanner
                    onBarCodeScanned={this.handleScanned}
                    style={[StyleSheet.absoluteFill, styles.container]}
                >
                    <View style={styles.layerTop} >
                        <Text style={styles.description}>Scan QR/Barcode</Text>
                    </View>

                    <View style={styles.layerCenter}>
                        <View style={styles.layerLeft} />
                        <View style={styles.focused} />
                        <View style={styles.layerRight} />
                    </View>

                    <View style={styles.layerBottom}>
                        <Text
                            onPress={() => this.props.navigation.navigate('_Home')}
                            style={styles.cancel}
                        >
                            Cancel
                        </Text>
                    </View>

                </BarCodeScanner>
            </View>
        );
    }
}

export default Scan;

//QR Read画面関連CSS
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    layerTop: {
        flex: 1,
        backgroundColor: opacity,
    },
    layerCenter: {
        height: width * 0.8,
        flexDirection: 'row',
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 8
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 1,
        backgroundColor: opacity
    },
    description: {
        fontSize: 20,
        marginTop: '15%',
        textAlign: 'center',
        color: 'white',
    },
    cancel: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginTop: '15%',
    },
});