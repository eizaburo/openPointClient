import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, Dimensions, Image, Linking } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import { connect } from 'react-redux';
import { updateEmail } from '../actions/user';

//data
import { caroucel_data } from '../data/caroucel';

//caroucel
import Carousel, { Pagination } from 'react-native-snap-carousel';

class Home extends React.Component {

    state = {
        data: caroucel_data,
        activeSlide: 0,
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableHighlight
                onPress={() => Linking.openURL(item.url)}
            >
                <Image source={{ url: item.url }} style={{ width: '100%', height: '100%' }} />
            </TouchableHighlight>
        );
    }

    render() {

        // console.log(this.state.data);

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableHighlight
                    style={{
                        marginTop: 20,
                    }}
                    underlayColor="#fff"
                    onPress={() => this.props.navigation.navigate('_History')}
                >
                    <LinearGradient
                        colors={['#393FFF', '#44A5FF']}
                        style={{ height: 200, width: 320, borderRadius: 10 }}
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
                    </LinearGradient>
                </TouchableHighlight>
                <View
                    style={{ flexDirection: "row" }}
                >
                    <View style={{ backgroundColor: "#fff", flex: 1 }}>
                        <Button
                            type="outline"
                            title="QRを表示する"
                            onPress={() => this.props.navigation.navigate('_Cpm')}
                            containerStyle={{
                                marginVertical: 20,
                                marginLeft: 30,
                                marginRight: 10,
                            }}
                            buttonStyle={{ height: 60, borderWidth: 1 }}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", flex: 1 }}>
                        <Button
                            type="outline"
                            title="QRを読み取る"
                            onPress={() => this.props.navigation.navigate('_Scan')}
                            containerStyle={{
                                marginVertical: 20,
                                marginLeft: 10,
                                marginRight: 30,
                            }}
                            buttonStyle={{ height: 60, borderWidth: 1 }}
                        />
                    </View>
                </View>
                <View style={{ alignSelf: "stretch" }}>
                    <Button
                        type="outline"
                        title="履歴を見る"
                        onPress={() => this.props.navigation.navigate('_History')}
                        containerStyle={{ marginHorizontal: 30 }}
                        buttonStyle={{ height: 60, borderWidth: 1 }}
                    />
                </View>
                <Text style={{ marginVertical: 20 }}>おすすめ情報</Text>
                <View style={{ height: 180 }}>
                    <Carousel
                        data={this.state.data}
                        renderItem={this._renderItem}
                        itemWidth={Dimensions.get("window").width * 0.6}
                        itemHeight={200}
                        sliderWidth={Dimensions.get("window").width * 1.0}
                        // containerCustomStyle={{ backgroundColor: "#eee" }}
                        onSnapToItem={index => this.setState({ activeSlide: index })}
                        loop
                        autoplay
                    />
                    <Pagination
                        dotsLength={this.state.data.length}
                        activeDotIndex={this.state.activeSlide}
                        containerStyle={{ paddingVertical: 10 }}
                    />
                </View>
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