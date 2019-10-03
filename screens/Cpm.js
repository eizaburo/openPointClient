import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//redux
import { connect } from 'react-redux';

//qr barcode
// import QRCode from 'react-native-qrcode';
import QRCodeSVG from 'react-native-qrcode-svg';
import QRCode from 'react-native-qrcode';
import Barcode from 'react-native-barcode-builder';

class Cpm extends React.Component {
    render() {
        //iosの場合
        if (Platform.OS === 'ios') {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "#aaa" }}>UID:{this.props.userData.user.uid}}</Text>
                    <View style={{ marginVertical: 20 }}>
                        <QRCodeSVG
                            value={this.props.userData.user.uid}
                            size={200}
                        />
                    </View>
                    <View>
                        <Barcode
                            value={this.props.userData.user.uid}
                            format="CODE128"
                            width={1}
                            height={50}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "#aaa" }}>UID:{this.props.userData.user.uid}}</Text>
                    <View style={{ marginVertical: 20 }}>
                        <QRCode
                            value={this.props.userData.user.uid}
                            size={200}
                        />
                    </View>
                </View>
            );
        }
    }
}

const mapStateToProps = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapStateToProps, null)(Cpm);
// export default Cpm;