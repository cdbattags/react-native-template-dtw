// react things
import * as React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {
    createStackNavigator,
    NavigationStackScreenProps,
} from 'react-navigation-stack'
import {
    Themed,
    createAppContainer,
    ThemeColors,
    useTheme,
} from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
    mapping,
    light as lightTheme,
} from '@eva-design/eva'
import {
    ApplicationProvider,
} from 'react-native-ui-kitten'
import LottieView from 'lottie-react-native'

import SSH from './components/ssh-example'
import View1 from './components/view1'
import View2 from './components/view2'

import testAnimation from '../animations/410-lego-loader.json'

const Home = (props: NavigationStackScreenProps) => {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    style={
                        {
                            height: '100%',
                            width: '100%',
                        }
                    }
                    source={
                        testAnimation
                    }
                    autoPlay loop />
            </View>
            <View style={{ flex: 1}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={theme === 'dark' ? styles.itemDark : styles.itemLight}
                    onPress={() => props.navigation.push('View1')}
                >
                    <Themed.Text>{View1.title}</Themed.Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={theme === 'dark' ? styles.itemDark : styles.itemLight}
                    onPress={() => props.navigation.push('View2')}
                >
                    <Themed.Text>{View2.title}</Themed.Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={theme === 'dark' ? styles.itemDark : styles.itemLight}
                    onPress={() => props.navigation.push('SSH')}
                >
                    <Themed.Text>{SSH.title}</Themed.Text>
                </TouchableOpacity>
                <Themed.StatusBar />
            </View>
        </View>
    )
}

const List = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: { title: 'dtw' },
    },
    View1: {
        screen: View1,
        navigationOptions: { title: View1.title },
    },
    View2: {
        screen: View2,
        navigationOptions: { title: View2.title },
    },
    SSH: {
        screen: SSH,
        navigationOptions: { title: SSH.title },
    },
})

const Navigation = createAppContainer(List)

const App = () => {
    let [theme, setTheme] = React.useState<'light' | 'dark'>('light')

    return (
        <ApplicationProvider
            mapping={mapping}
            theme={lightTheme}>
            <View style={styles.container}>
                <Navigation theme={theme} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor: ThemeColors[theme].bodyContent,
                                borderColor: ThemeColors[theme].bodyBorder,
                                shadowColor: ThemeColors[theme].label,
                            },
                        ]}
                        onPress={() => {
                            setTheme(theme === 'light' ? 'dark' : 'light')
                        }}
                    >
                        <MaterialCommunityIcons
                            name="theme-light-dark"
                            size={30}
                            color={ThemeColors[theme].label}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ApplicationProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonContainer: {
        position: 'absolute' as const,
        bottom: 60,
        right: 20,
    },
    button: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        elevation: 5,
        borderWidth: 1,
    },
    itemLight: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
    },
    itemDark: {
        padding: 16,
        backgroundColor: ThemeColors.dark.bodyContent,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: ThemeColors.dark.bodyBorder,
    },
})

export default App
