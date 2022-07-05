import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import colors from '../Style/Colors';

function TabBar() {

    const navigation = useNavigation();
    const route = navigation.getCurrentRoute();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Search')
                }}
            >
                <AntDesign name="search1" size={24} color={route == undefined ? colors.textSecondary : route.name === 'Search' ? colors.textPrimary : colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Library')
                }}
            >
                <Entypo name='folder-music' size={24} color={route == undefined ? colors.textSecondary : route.name === 'Library' ? colors.textPrimary : colors.textSecondary} />
            </TouchableOpacity>
        </View>
    )
}

export default TabBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})