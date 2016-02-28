/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { AppRegistry, Component, StyleSheet, Text, View, Image } from 'react-native';

const MOCKED_MOVIES_DATA = [
    {
        title: 'Title',
        year: '2015',
        posters: {
            thumbnail: 'http://i.imgur.com/UePbdph.jpg'
        }
    }
]

class ReactProject extends Component {
    render() {
        const [movie, ...rest] = MOCKED_MOVIES_DATA;
        return (
            <View style={styles.container}>
              <Text>{movie.title}</Text>
              <Text>{movie.year}</Text>
              <Image
                style={styles.thumbnail}
                source={{
                    uri: movie.posters.thumbnail
                }} />
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81
    }
});

AppRegistry.registerComponent('ReactProject', () => ReactProject);
