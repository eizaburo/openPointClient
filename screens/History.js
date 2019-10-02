import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Card, Input, Button, ListItem } from 'react-native-elements';

//firebase
import Firebase, { db } from '../config/Firebase';
import firebase from 'firebase';

//moment
import moment from 'moment';

const { height, width } = Dimensions.get("window");

class History extends React.Component {

    state = {
        documentData: [],
        limit: 10,
        lastVisible: null,
        loading: false,
        refreshing: false,
    }

    componentDidMount = () => {
        try {
            this.retrieveData();
        } catch (e) {
            console.log(e);
        }
    }

    retrieveData = async () => {
        try {

            this.setState({ refreshing: true });

            let initialQuery = await db.collection('transactions')
                .orderBy('createdAt', 'desc')
                .limit(this.state.limit);

            let documentSnapshots = await initialQuery.get();

            let documentData = documentSnapshots.docs.map(document => document.data());

            let lastVisible = documentData[documentData.length - 1].createdAt;

            this.setState({
                documentData: documentData,
                lastVisible: lastVisible,
                loading: false,
            });

            this.setState({ refreshing: false });

        } catch (e) {
            console.log(e);
        }
    }

    retrieveMore = async () => {
        try {

            this.setState({ loading: true });

            let additionalQuery = await db.collection('transactions')
                .orderBy('createdAt', 'desc')
                .startAfter(this.state.lastVisible)
                .limit(this.state.limit);

            let documentSnapshots = await additionalQuery.get();

            let documentData = documentSnapshots.docs.map(document => document.data());

            //最後かどうか見る
            if (documentData.length < this.state.limit) {

                //もうページがない
                this.setState({
                    documentData: [...this.state.documentData],
                    lastVisible: this.state.lastVisible,
                    loading: false,
                });

            } else {
                //まだページがある
                let lastVisible = documentData[documentData.length - 1].createdAt;

                this.setState({
                    documentData: [...this.state.documentData, ...documentData],
                    lastVisible: lastVisible,
                    loading: false,
                });
            }

            this.setState({ loading: false });

        } catch (e) {
            console.log(e);
        }
    }

    renderHeader = () => {
        return (
            <Text style={{ fontSize: 18, alignSelf: 'stretch', backgroundColor: "#eee", padding: 15, textAlign: 'center' }}>利用履歴</Text>
        );
    }

    renderFooter = () => {
        if (this.state.loading) {
            return (<ActivityIndicator style={{ margin: 20 }} />);
        } else {
            return null;
        }
    }

    render() {
        // console.log(this.state);
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.documentData}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, padding: 10, alignSelf: 'stretch' }}>
                            <Text>Transaction Date: {moment(item.createdAt.seconds * 1000).format('YYYY-MM-DD HH:mm:ss')}</Text>
                            <Text>Transaction ID: {item.tranId}</Text>
                            <Text
                                style={{ color: item.operation === 'SEND' ? 'blue' : 'red' }}
                            >Operation: {item.operation}</Text>
                            <Text>Point: {item.point}</Text>
                            <Text>To: {item.to}</Text>
                            <Text>From: {item.from}</Text>
                        </View>
                    )}
                    onEndReachedThreshold={0}
                    onEndReached={this.retrieveMore}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.retrieveData}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}

export default History;