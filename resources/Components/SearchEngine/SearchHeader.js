import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../Style/Colors';

function SearchHeader({ setSearchValue, clearResults }) {

    const [value, setValue] = useState('');

    useEffect(() => {
        setSearchValue(value);
    }, [value])

    return (
        <View style={styles.searchBarContainer}>
            <AntDesign name='search1' size={20} color='white' style={{
                position: 'absolute',
                zIndex: 1,
                left: 30
            }}/>
            <TextInput
                value={value}
                style={styles.searchBar}
                placeholder='Search'
                placeholderTextColor={'white'}
                onChangeText={(newValue) => {
                    setValue(newValue);
                }}
            />

            <TouchableOpacity 
                style={styles.cancelSearchButton} 
                onPress={() => {
                    setValue('');
                    clearResults();
                }}
            >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SearchHeader;

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: colors.bgHighlight,
        width: '100%',
        height: 55,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    searchBar: {
        paddingHorizontal: 40,
        width: '80%',
        height: 35,
        backgroundColor: colors.bgElevated,
        borderRadius: 8,
        color: 'white'
    },
    cancelSearchButton: {
    },
})