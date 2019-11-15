// react things
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class View1 extends Component {
    static title = 'view1'

    render() {
        return (
            <View style={styles.genericContainer}>
                <Text>Hello, world!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    genericContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
})