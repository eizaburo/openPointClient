import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

//dotenv
import { NEWS_API_KEY } from 'react-native-dotenv';

//article
import Article from './Article';

class News extends React.Component {

    state = {
        articles: [],
        refreshing: false,
    }

    getNews = async () => {
        this.setState({ refreshing: true });
        const url = "https://newsapi.org/v2/top-headlines?country=jp&apiKey=" + NEWS_API_KEY;
        try {
            const result = await fetch(url);
            const json = await result.json();
            this.setState({
                articles: json.articles,
                refreshing: false,
            });

        } catch (e) {
            this.setState({
                refreshing: false,
            });
            console.log(e);
        }
    }

    componentDidMount = () => {
        this.getNews();
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <FlatList
                    data={this.state.articles}
                    keyExtractor={item => item.url}
                    renderItem={({ item }) => <Article article={item} />}
                    onRefresh={() => this.getNews()}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}

export default News;