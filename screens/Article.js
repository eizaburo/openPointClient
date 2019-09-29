import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, Linking } from 'react-native';
import { Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

class Article extends React.Component {
    render() {

        const { description, publishedAt, source, urlToImage, url } = this.props.article;
        const time = moment(publishedAt || moment.now()).fromNow();
        const defaultImage = "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg";
        return (
            <TouchableHighlight
                useForeground
                onPress={() => Linking.openURL(url)}
            >
                <Card
                    image={{ uri: urlToImage || defaultImage }}
                >
                    <Text style={{ marginBottom: 10 }}>{description || 'Read more...'}</Text>
                    <Divider style={{ backgroundColor: "#aaa" }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <Text style={{ margin: 5, fontSize: 10 }}>{source.name.toUpperCase()}</Text>
                        <Text style={{ margin: 5, fontSize: 10 }}>{time}</Text>
                    </View>
                </Card>
            </TouchableHighlight>
        );
    }
}

export default Article;