import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DetailView } from '../features';

class Detail extends Component {  
  render() { 
    return ( 
      <DetailView dataName={this.props.dataName} comment={this.props.comment}/>     
    )
    
  }
}

export default Detail;
