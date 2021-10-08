import * as React from 'react';
import {View, Text, Alert, Flatlist, StyleSheet, SafeAreaView} from 'react-native';
import {Card, Icon} from 'react-native-elements'
import axios from 'axios';

export default class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            details: {},
            imagepath: '',
            url: 'http://4935-108-26-227-109.ngrok.io/planet?name=${this.props.navigation.getParam("planetName")}',
        }
    }
    getDetails=()=>{
        const {url} = this.state;
        axios.get(url).then(response=>{
        this.setDetails(response.data.data)
        })
        .catch(error=>{
            Alert.alert(error.message)
        })

    }
    componentDidMount(){
        this.getDetails()
    }
    setDetails = (details)=>{
        const planettype = details.planet_type;
        let imagepath = "";
        switch(planettype){
            case "Gas Giant":
                imagepath = require("../assets/gas_giant.png")
                break;
            case "Terrestrial":
                imagepath = require("../assets/terrestrial.png")
                break;
            case "Super Earth":
                imagepath = require("../assets/super_earth.png")
                break;
            case "Neptune Like":
                imagepath = require("../assets/neptune_like.png")
                break;
            default:
                imagepath = require("../assets/gas_giant.png")
        }
        this.setState({details: details, imagepath: imagepath})
    }
    render() {
        const { details, imagepath } = this.state;
        if (details.specifications) {
          return (
            <View style={styles.container}>
              <Card
                title={details.name}
                image={imagepath}
                imageProps={{ resizeMode: "contain", width: "100%" }}
              >
                <View>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Gravity : ${details.gravity}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Orbital Period : ${details.orbital_period}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Orbital Speed : ${details.orbital_speed}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Mass : ${details.planet_mass}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Radius : ${details.planet_radius}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Type : ${details.planet_type}`}</Text>
                </View>
                <View style={[styles.cardItem, { flexDirection: "column" }]}>
                  <Text>{details.specifications ? `Specifications : ` : ""}</Text>
                  {details.specifications.map((item, index) => (
                    <Text key={index.toString()} style={{ marginLeft: 50 }}>
                      {item}
                    </Text>
                  ))}
                </View>
              </Card>
            </View>
          );
        }
        return null;
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      cardItem: {
        marginBottom: 10
      }
    });