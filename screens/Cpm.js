import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//redux
import { connect } from 'react-redux';

//qr barcode
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-builder';

class Cpm extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: "#aaa" }}>UID:{this.props.userData.user.uid}}</Text>
                <View style={{ marginVertical: 20 }}>
                    <QRCode
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
    }
}

const mapStateToProps = state => (
    {
        userData: state.userData,
    }
);

export default connect(mapStateToProps, null)(Cpm);
// export default Cpm;