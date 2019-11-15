// react things
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class View2 extends Component {
    static title = 'view2'

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