import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../Style/Colors';

function EmptySearch() {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.searchLanding}>
                <KeyboardAvoidingView style={styles.landingTitle} behavior='height'>
                    <Text 
                        style={{
                            color: 'white', 
                            fontWeight: 'bold',
                            fontSize: 25,
                            marginVertical: 5
                        }}
                    >
                        Play what you <Text style={{color: colors.appleMusicPink}}>love.</Text>
                    </Text>
                    <Text
                        style={{
                            color: 'white', 
                            fontWeight: 'normal',
                            fontSize: 15,
                            marginVertical: 10
                        }}
                    >
                        Search for songs, artists, podcasts and more.
                    </Text>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EmptySearch;

const styles = StyleSheet.create({
    searchLanding: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    landingTitle: {
        alignItems: 'center',
    }
})