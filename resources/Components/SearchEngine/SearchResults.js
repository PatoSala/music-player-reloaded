import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal } from 'react-native-modal';

import colors from '../../Style/Colors';

// Components
import SongListItem from '../SongListItem';

function SearchResults({ results }) {

    const [modal, setModal] = useState(false);

    let toggleModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient style={styles.container} colors={[colors.bgElevated, colors.bgElevated, colors.bgHighlight, colors.bgHighlight, colors.bgHighlight, colors.bgPrimary, colors.bgPrimary, colors.bgPrimary, colors.bgPrimary]}>
                    {/* <Text style={{color: 'white'}}>Check the Console!</Text> */}

                    <FlatList
                        data={results}
                        extraData={results}
                        contentInset={{bottom: 200}}
                        renderItem={({ item }) => {
                            return (
                                <SongListItem song={item} toggleModal={toggleModal}/>
                            )
                        }}
                    />

                </LinearGradient>
            </TouchableWithoutFeedback>
        </>
    )
}

export default SearchResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    }
})