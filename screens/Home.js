import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, Dimensions, Image, Linking, ScrollView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

//redux
import { connect } from 'react-redux';
import { updateEmail } from '../actions/user';

//data
import { caroucel_data, caroucel_data_afs } from '../data/caroucel';

//caroucel
import Carousel, { Pagination } from 'react-native-snap-carousel';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

class Home extends React.Component {

    state = {
        data: caroucel_data_afs,
        activeSlide: 0,
        overlaySpinner: false,
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableHighlight
                onPress={() => Linking.openURL(item.web)}
            >
                <Image source={{ url: item.url }} style={{ width: '100%', height: '100%' }} />
            </TouchableHighlight>
        );
    }

    render() {

        // console.log(this.state.data);

        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#f0ffff" }}>
                <ScrollView>
                    <TouchableHighlight
                        style={{
                            marginTop: 10,
                        }}
                        underlayColor="#fff"
                        onPress={() => this.props.navigation.navigate('_History')}
                    >
                        <LinearGradient
                            colors={['#393FFF', '#44A5FF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.3, y: 1.2 }}
                            style={{ height: 200, width: 320, borderRadius: 10, alignSelf: 'center' }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    position: "absolute",
                                    top: 30,
                                    left: 30,
                                    fontSize: 12,
                                }}
                            >
                                会員UID：{this.props.userData.user.uid}
                            </Text>
                            <Text
                                style={{
                                    color: "#fff",
                                    position: "absolute",
                                    top: 60,
                                    left: 30,
                                    fontSize: 12,
                                }}
                            >
                                会員EMail：{this.props.userData.user.email}
                            </Text>
                            <Text
                                style={{
                                    color: "#fff",
                                    position: "absolute",
                                    top: 90,
                                    left: 30,
                                    fontSize: 12,
                                }}
                            >
                                現在有効なポイント残高
                            </Text>
                            <Text
                                style={{
                                    color: "#fff",
                                    position: "absolute",
                                    top: 130,
                                    right: 40,
                                    fontSize: 24,
                                }}
                            >
                                {this.props.userData.user.point}pt
                            </Text>
                            <Text
                                style={{
                                    color: "#fff",
                                    position: "absolute",
                                    top: 180,
                                    right: 10,
                                    fontSize: 10,
                                }}
                            >
                                クリックすると利用履歴を確認できます。
                            </Text>
                        </LinearGradient>
                    </TouchableHighlight>
                    <View
                        style={{ flexDirection: "row" }}
                    >
                        <View style={{ flex: 1 }}>
                            <Button
                                type="outline"
                                title=" QR表示"
                                onPress={() => this.props.navigation.navigate('_Cpm')}
                                containerStyle={{
                                    marginTop: 10,
                                    marginLeft: 30,
                                    marginRight: 5,
                                }}
                                buttonStyle={{ height: 60, borderWidth: 1 }}
                                icon={<Icon5 name="qrcode" color="#2089dc" size={18} />}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                type="outline"
                                title=" QR読取り"
                                onPress={() => this.props.navigation.navigate('_Scan')}
                                containerStyle={{
                                    marginTop: 10,
                                    marginLeft: 5,
                                    marginRight: 30,
                                }}
                                buttonStyle={{ height: 60, borderWidth: 1 }}
                                icon={<Image source={require('../assets/qrcode-read.png')} style={{width:20, height:20, tintColor:"#2089dc"}} />}
                            />
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row" }}
                    >
                        <View style={{ flex: 1 }}>
                            <Button
                                type="outline"
                                title=" お店を探す"
                                onPress={() => this.props.navigation.navigate('_Shop')}
                                containerStyle={{
                                    marginTop: 10,
                                    marginLeft: 30,
                                    marginRight: 5,
                                }}
                                buttonStyle={{ height: 60, borderWidth: 1 }}
                                icon={<Icon5 name="store" color="#2089dc" size={18} />}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                type="outline"
                                title=" 交換する"
                                onPress={() => this.props.navigation.navigate('_Exchange')}
                                containerStyle={{
                                    marginTop: 10,
                                    marginLeft: 5,
                                    marginRight: 30,
                                }}
                                buttonStyle={{ height: 60, borderWidth: 1 }}
                                icon={<Icon5 name="exchange-alt" color="#2089dc" size={18} />}
                            />
                        </View>
                    </View>
                    <View style={{ alignSelf: "stretch" }}>
                        <Button
                            type="outline"
                            title=" 履歴を見る"
                            onPress={() => this.props.navigation.navigate('_History')}
                            containerStyle={{ marginHorizontal: 30, marginTop: 10, }}
                            buttonStyle={{ height: 60, borderWidth: 1 }}
                            icon={<Icon5 name="receipt" color="#2089dc" size={18} />}
                        />
                    </View>
                    <Text style={{ marginVertical: 20, alignSelf: 'center' }}>おすすめ情報</Text>
                    <View style={{ height: 180 }}>
                        <Carousel
                            data={this.state.data}
                            renderItem={this._renderItem}
                            itemWidth={Dimensions.get("window").width * 0.6}
                            itemHeight={200}
                            sliderWidth={Dimensions.get("window").width * 1.0}
                            containerCustomStyle={{ backgroundColor: "#f0ffff" }}
                            onSnapToItem={index => this.setState({ activeSlide: index })}
                            loop
                            autoplay
                        />
                        <Pagination
                            dotsLength={this.state.data.length}
                            activeDotIndex={this.state.activeSlide}
                            containerStyle={{ paddingVertical: 10 }}
                            dotStyle={{ backgroundColor: '#1e90ff' }}
                        />
                    </View>
                    <Spinner
                        visible={this.state.overlaySpinner}
                        // visible={true}
                        textContent="読込中..."
                        textStyle={{ color: "#fff" }}
                        overlayColor="rgba(0,0,0,0.5)"
                    />
                </ScrollView>
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