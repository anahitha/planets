import * as React from 'react';
import {View, Text, Alert, Flatlist, StyleSheet, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements'
import axios from 'axios';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listdata: [],
            url: 'https://4935-108-26-227-109.ngrok.io'
        }
    }
    getPlanets=()=>{
        const {url} = this.state;
        console.log(url)
        axios
        .get(url).then(response=>{
            console.log("data, ", response.data)
            console.log("data() ",response.data())
            console.log("data.data ",response.data.data)
            return(
                this.setState({
                    listdata: response.data
                })
            )
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    renderItem = ({item, index})=>(
        <ListItem
        key={index}
        title = {'planet: ${item.name}'}
        subtitle = {'distance from Earth: ${item.distance_from_earth}'}
        containerStyle = {styles.container}
        bottomDivider
        chevron 
        onPress = {()=>{this.props.navigation.navigate("Details", {planetName: item.name})}}
        ></ListItem>
    )
    keyExtractor = (item, index)=>{index.toString()}
    componentDidMount(){
        this.getPlanets()
    }
    render(){
        const {listdata} = this.state;
        if (listdata.length==0){
            return(
                <View style = {styles.emptyContainer}>
                    <Text>Loading...</Text>
                </View>
            )
        }else{
            return(
                <View style = {styles.container}>
                    <SafeAreaView>
                    </SafeAreaView>
                    <View style = {styles.upperContainer}>
                        <Text style = {styles.headerText}>Planet World</Text>
                    </View>
                    <View style = {styles.lowerContainer}>
                        <Flatlist 
                        keyExtractor = {this.keyExtractor}
                        renderItem = {this.renderItem}
                        data = {this.state.listdata}></Flatlist>
                    </View>
                </View>
            )
        } 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edc988"
    },
    upperContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#132743"
    },
    lowerContainer: {
      flex: 0.9
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyContainerText: {
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#d7385e"
    },
    listContainer: {
      backgroundColor: "#eeecda"
    }
  });