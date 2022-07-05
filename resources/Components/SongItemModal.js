import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToQueue } from '../../Redux/Slices/queueSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import colors from '../Style/Colors';

function SongItemModal({ song, setModal }) {

    const dispatch = useDispatch();

    return (
        <BlurView intensity={20} style={styles.container}>

            <View style={styles.thumbnailsContainer}>
                {
                    song.thumbnails[1].url !== undefined ? (
                        <Image source={{uri: song.thumbnails[1].url}} style={{width: '100%', height: '100%'}}/>
                    ) : (
                        <Entypo name="note" size={24} color="black" />
                    )
                }
            </View>

            <Text style={styles.modalSongTitle}>{ song.name }</Text>
            
            <TouchableOpacity style={styles.modalLinkContainer}>
                <MaterialCommunityIcons name="heart-outline" size={28} color={colors.textSecondary} />
                <Text style={styles.modalLinkText}>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalLinkContainer} onPress={() => {dispatch(addToQueue(song)), setModal(false)}}>
                <MaterialCommunityIcons name="playlist-music-outline" size={28} color={colors.textSecondary} />
                <Text style={styles.modalLinkText}>Add to queue</Text>
            </TouchableOpacity>


        </BlurView >
    )
}

export default SongItemModal;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 40,
        justifyContent: 'center'
    },
    modalSongTitle: {
        color: colors.textPrimary,
        fontSize: 25,
        marginVertical: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    modalLinkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    modalLinkText: {
        fontSize: 20,
        color: colors.textSecondary,
        marginLeft: 15
    },
    thumbnailsContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
})