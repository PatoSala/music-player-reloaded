import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../../Redux/Slices/currentSongSlice';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import colors from '../Style/Colors';

// Modal
import SongItemModal from './SongItemModal';

function SongListItem({ song }) {

    const currentSong = useSelector((state) => state.currentSong.value);
    const dispatch = useDispatch();

    const songData = {
        name: song.name,
        thumbnails: song.thumbnails,
        videoId: song.videoId,
        artist: song.artist
    }

    const [modal, setModal] = useState(false)

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <TouchableOpacity style={styles.container} onPress={() => {
                    dispatch(setCurrentSong(songData));
                }}>
                    <View style={styles.songInfo}>
                        <View style={styles.thumbnailsContainer}>
                            {
                                song.thumbnails[0].url !== undefined ? (
                                    <Image source={{uri: song.thumbnails[0].url}} style={{width: '100%', height: '100%'}}/>
                                ) : (
                                    <Entypo name="note" size={24} color="black" />
                                )
                            }

                            {
                                currentSong !== undefined ? (
                                    currentSong.payload.videoId === song.videoId ? (
                                        <View style={styles.playingAnimContainer}>
                                            <Entypo name="note" size={24} color={colors.appleMusicPink} />
                                        </View>
                                    ) : null
                                ) : null
                            }
                        </View>
                        <View style={styles.songNameContainer}>
                            <Text style={[styles.name, {color: currentSong != undefined ? (currentSong.payload.videoId === song.videoId ? colors.appleMusicPink : 'white') : 'white'}]}>
                                {
                                    song.name.length > 22 ? (song.name.slice(0, 22).concat('...')) : (song.name)
                                }
                            </Text>

                            <Text style={styles.artist}>
                                {
                                    Array.isArray(song.artist) ? null : (song.artist.name.length > 25 ? (song.artist.name.slice(0, 25).concat('...')) : (song.artist.name))
                                }
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => {setModal(!modal)}} style={styles.dotsHorizontal}>
                        <Entypo name="dots-three-horizontal" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                </TouchableOpacity>
            </TouchableWithoutFeedback>

            <Modal 
                isVisible={modal}
                animationIn='fadeInUp'
                onBackdropPress={() => setModal(!modal)}
                swipeDirection='down'
                onSwipeComplete={() => setModal(!modal)}
                style={{margin: 0}}
            >
                <SongItemModal song={song} setModal={setModal}/>
            </Modal>
        </>
    )
}

export default SongListItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    songInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    thumbnailsContainer: {
        width: 52,
        height: 52,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playingAnimContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.bgHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7
    },
    songNameContainer: {
        paddingLeft: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    artist: {
        color: colors.textSecondary
    },
    dotsHorizontal: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})