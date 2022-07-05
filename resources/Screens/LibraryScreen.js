import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../Style/Colors';

// Components
import LibraryHeader from '../Components/Library/LibraryHeader';

function LibraryScreen() {
    return (
        <View style={styles.example}>
            <LibraryHeader/>
        </View>
    )
}

export default LibraryScreen;

const styles = StyleSheet.create({
    example: {
        flex: 1,
        backgroundColor: colors.bgPrimary,
    }
});