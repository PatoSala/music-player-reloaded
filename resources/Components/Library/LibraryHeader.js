import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import colors from '../../Style/Colors';

function LibraryHeader() {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <Text style={styles.title}>Library</Text>

                <TouchableOpacity>
                    <AntDesign name="plus" size={35} color={colors.appleMusicPink} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LibraryHeader;

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 55,
        backgroundColor: colors.bgHighlight,
        paddingHorizontal: 20
    },
    headerContent: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 34
    }
})