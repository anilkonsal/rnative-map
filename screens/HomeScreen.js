import React from 'react';
import MapView, { UrlTile } from 'react-native-maps';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  File,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 90 //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO



console.log(LONGITUDE_DELTA);

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // getInitialState() {
  //   return { urlTemplate: 'https://www.pentarem.com/wp-content/map/tiled/{z}/{x}/{y}.jpg' }
  // }


  constructor(props) {
    super(props);
    this.state = {
      urlTemplate: 'https://www.pentarem.com/wp-content/map/tiled/{z}/{x}/{y}.jpg',
      // urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      region: {
        latitude: this.tile2lat(0, 0),
        longitude: this.tile2long(0, 0),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

    };
  }



  tile2long(x, z) {
    return (x / Math.pow(2, z) * 360 - 180);
  }
  tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
  }


  onRegionChange = (region) => {
    this.setState({ region, zoom: Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2) });

  }

  componentDidMount(props) {

  }

  onZoomInPress() {
    console.log(this.state)
    const region = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta: this.state.region.latitudeDelta * 2,
      longitudeDelta: this.state.region.longitudeDelta * 2,
    }
    this.map.animateToRegion(region, 100);
  }

  onZoomOutPress() {

  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.topPanel}>
          <Text>Zoom Level: {this.state.zoom}</Text>
        </View>
        <MapView

          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          mapType={"none"}
          ref={ref => this.map = ref}
        >
          <UrlTile
            urlTemplate={this.state.urlTemplate}
            zIndex={1}
          />
        </MapView>
        <View style={styles.zoomControl}>
          <Button onPress={() => this.onZoomInPress()} style={styles.zoomInButton} title='+' />
          <Button onPress={() => this.onZoomOutPress()} style={styles.zoomOutButton} title='-' />
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  zoomControl: {
    position: 'absolute',
    top: 100,
    left: 20,
    height: 100,
    backgroundColor: '#fff',
    width: 40
  },
  zoomInButton: {
    height: 20,
    backgroundColor: 'red',
    width: 20
  },
  zoomOutButton: {
    height: 20,
    backgroundColor: 'red',
    width: 20,
    marginTop: 40
  },
  topPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },

  bottom: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
