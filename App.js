import { Location, Permissions, MapView } from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      coords: {
        latitude: null,
        longitude: null
      }
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    console.log(status)
    if (status === 'granted') {
      try {
        const location = await Location.getCurrentPositionAsync()
        console.log('buuu')
        console.log('POSICIO: ' + JSON.stringify(location))
        this.setState({
          coords: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        })
        console.log('buuu')
      } catch (error) {
        console.log(error)
        alert('nuuu')
      }
    } else {
      alert('no position')
    }
  }
  //[this.state.coords.latitude, this.state.coords.longitude]
  render() {
    if (this.state.coords !== null && this.state.coords.latitude !== null && this.state.coords.longitude !== null) {
      console.log('aqui')
      console.log(this.state.coords)
      return (
        <View style={styles.container}>
          <MapView
            style={{ alignSelf: 'stretch', height: 400 }}
            showsUserLocation={false}
            followUserLocation={false}
            zoomEnabled={true}
            initialRegion={{
              latitude: this.state.coords.latitude,
              longitude: this.state.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <MapView.Marker
              title="name mark"
              coordinate={{
                latitude: this.state.coords.latitude,
                longitude: this.state.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            />
            <MapView.Circle
              radius={2000}
              strokeColor="#4F6D7A"
              strokeWidth={2}
              fillColor={'rgba(230,238,255,0.5)'}
              center={{
                latitude: this.state.coords.latitude,
                longitude: this.state.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            />
          </MapView>
        </View>
      )
    } else {
      return <Text>Nada...</Text>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
