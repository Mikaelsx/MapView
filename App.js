// IMPORTS

import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // REACT NATIVE

import { useEffect, useState } from 'react'; // REACT

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // MAPA - MARCADOR

import { // PERMISSÕES DE LOCALIZAÇÃO
  requestForegroundPermissionsAsync, // SOLICITA A PERMISSÃO DE LOCALIZAÇÃO
  getCurrentPositionAsync, // CAPTURA A LOCALIZAÇÃO ATUAL
} from 'expo-location'

import MapViewDirections from 'react-native-maps-directions' // TRAJETO

import { mapsKey } from './utils/mapsKey/mapsKey'; // CHAVE DE ACESSO GOOGLE CLOUND

// EXPORT

export default function App() {
  const [initialPosition, setInitialPosition] = useState( null )

  async function CapturarLocalizacao() {
    const { granted } = await requestForegroundPermissionsAsync()
    
    if ( granted ) {
      const currentPosition = await getCurrentPositionAsync()
      await setInitialPosition( currentPosition )
      console.log( initialPosition )
      // console.log( initialPosition.coords )
    }
  }

  useEffect(() => {
    CapturarLocalizacao()
  }, [10000])

  return (
    <View style={styles.container}>
      {
        initialPosition != null
          // IF
        ? (
          // MAPA
          <MapView
          initialRegion={{
            latitude : initialPosition.coords.latitude,
            longitude : initialPosition.coords.longitude,
            latitudeDelta : 0.005,
            longitudeDelta : 0.005
          }}
          provider={PROVIDER_GOOGLE}
          style={ styles.map }
          customMapStyle={grayMapStyle}
        >
          {/* MARCADOR - INICIAL */}
        <Marker
          coordinate={{
            latitude : initialPosition.coords.latitude,
            longitude : initialPosition.coords.longitude
          }}
          title='SENAI INFORMÁTICA - SÃO CAETANO DO SUL, SP'
          description='Rua Niterói, 180 - Centro, São Caetano do Sul - SP'

          
        />
          {/* LINHA DE TRAJETO */}

        <MapViewDirections
          origin={ initialPosition.coords }
          destination={{
            latitude :-23.6679,
            longitude : -46.4241,
            latitudeDelta : 0.005,
            longitudeDelta : 0.005
          }}
          apikey={mapsKey}

          strokeWidth={3}
          strokeColor='#984AE6'
        />

          {/* MARCADOR - FINAL */}

        <Marker
          coordinate={{
            latitude :-23.6679,
            longitude : -46.4241,
          }}
          title='CASA DOS PNEUS - MAUÁ, SP'
          description='Avenida Valdemar Jesuíno da Silva 661 - Jardim Estrela, Mauá - SP'
          
        />
    
        </MapView>
        ) : (
          <>
          {/* ELSE */}
          <Text>localização não encontrada</Text>
          <ActivityIndicator/>
          </>
        )
      }

      <TouchableOpacity>
        <Text>AAAAAAAAAA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%'
  },
  
 });

 const grayMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },

];

