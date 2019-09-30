import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class Mpm extends React.Component {
    render() {

        //データ受け取り
        let params = '';
        if (this.props.navigation.state.params !== undefined) {
            params = this.props.navigation.state.params;
        }

        return (
            <View style={{ flex: 1 }}>
                <Card title="読取り結果に対する操作">
                    <Input
                        label="読取り内容（ID）"
                        value={params.data}
                        disabled
                        inputStyle={{fontSize:16}}
                        errorMessage="フォーマットが不正なようです。"
                    />
                    <Input
                        label="操作ポイント数"
                        value={'0'}
                        labelStyle={{ marginTop: 20 }}
                        errorMessage="ポイントが足りません。"
                    />
                    <Button
                        title="ポイントを送る（使う）"
                        buttonStyle={{ marginTop: 20 }}
                    />
                    <Text style={{ margin: 5 }}>※相手に加算され、自分は減算されます。</Text>
                    <Button
                        title="ポイントを受取る（貰う）"
                        buttonStyle={{ marginTop: 20 }}
                    />
                    <Text style={{ margin: 5 }}>※相手は減算され、自分に加算されます。</Text>
                    <Button
                        title="もう一度読む"
                        buttonStyle={{ marginTop: 20 }}
                    />
                    <Button
                        title="Homeに戻る"
                        buttonStyle={{ marginTop: 20 }}
                    />
                </Card>
            </View>
        );
    }
}

export default Mpm;