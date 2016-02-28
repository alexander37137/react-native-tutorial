/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Dimensions,
    Animated
} from 'react-native';

const REQUEST_URL = 'https:/raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class ReactProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            bounceValue: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.fetchData();
        this.state.bounceValue.setValue(1.5);
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 0.8,
                friction: 1,
            }
        ).start();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <Image
                style={styles.background}
                source={require('./background-big.jpg')}>
                <Animated.Image
                    source={require('./logo.png')}
                    style={[styles.bouncer, {transform: [{scale: this.state.bounceValue}]}]}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
            </Image>

        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.thumbnail}
                    source={{uri: movie.posters.thumbnail}}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: "column",
        width: null,
        height: null
    },
    bouncer: {
        flex: 1,
    },
    listView: {
        flex: 6,
        paddingTop: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, .8)'

    },
    year: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, .6)'
    }
});

AppRegistry.registerComponent('ReactProject', () => ReactProject);
