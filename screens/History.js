import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
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

        } catch (e) {
            console.log(e);
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
                        <ListItem
                            title={moment(item.createdAt.seconds * 1000).format('YYYY-MM-DD hh:mm:ss')}
                            subtitle={item.operation}
                            bottomDivider
                        />
                    )}
                />
            </View>
        );
    }
}

export default History;