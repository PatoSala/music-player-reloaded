import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, TouchableOpacity, Text, StyleSheet, Button, Animated, AppState, ActivityIndicator } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { setCurrentSong } from '../../Redux/Slices/currentSongSlice';
import { removeFirstFromQueue } from '../../Redux/Slices/queueSlice';
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../Style/Colors';

// Components
import SongTimer from './SongTimer';
import CurrentSongModal from './CuerrentSongModal/CuerrentSongModal';

function PlaybackControls() {
    
    const playerRef = useRef();
    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.currentSong.value);
    const queue = useSelector((state) => state.queue.value);

    const [songDuration, setSongDuration] = useState(undefined);
    const [currentTime, setCurrentTime] = useState(undefined);
    const [currentSongModal, setCurrentSongModal] = useState(false);

    useEffect(() => {
        if (currentSong != undefined) {
            console.log(currentSong.payload.name);

            playerRef.current.getDuration().then((duration) => {
                setSongDuration(duration);
            });
        }
    }, [currentSong])

    useEffect(() => {
        if (queue.length > 0) {
            queue.map((song) => {
                console.log(song.payload.name);
            })
        } else {
            console.log('Queue is empty!');
        }
    }, [queue]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: -95,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    if (currentSong !== undefined) {
        fadeIn();
    }

    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    const onStateChange = useCallback((state) => {
        console.log(state);

        if (state === "ended") {
            queue.length > 0 ? (
                dispatch(setCurrentSong(queue[0].payload)),
                dispatch(removeFirstFromQueue())
            ) : setPlaying(false);
        }

        if (state === 'buffering') {
            setLoading(true);
        }

        if (state === 'playing' || state === 'paused') {
            setLoading(false)
        }

    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const nextSong = () => {
        if (queue.length > 0) {
            dispatch(setCurrentSong(queue[0].payload));
            dispatch(removeFirstFromQueue());
        } else {
            console.log('Queue is empty!');
        }
    }

    return (
        currentSong !== undefined ? (
            <TouchableOpacity style={[styles.container, {bottom: 0, transform: [{ translateY: fadeAnim }]}]}>
                <LinearGradient style={styles.playbackControls} colors={[colors.appleMusicPink, colors.appleMusicPink, colors.appleMusicPink, '#f03a7a', '#f03a7a', '#f25a8f']} end={{ x: 1, y: 0.2 }}>
                    <View style={styles.wrapper}>
                        <View style={styles.songInfo}>
                            <View style={styles.thumbnailsContainer}>
                                {
                                    currentSong.payload.thumbnails[0].url !== undefined ? (
                                        <Image source={{uri: currentSong.payload.thumbnails[0].url}} style={{width: '100%', height: '100%', borderRadius: 4}}/>
                                    ) : (
                                        <Entypo name="note" size={24} color="black" />
                                    )
                                }
                            </View>

                            <View style={styles.songNameContainer}>
                                <Text style={styles.name}>
                                    {
                                        currentSong.payload.name.length > 20 ? (currentSong.payload.name.slice(0, 15).concat('...')) : (currentSong.payload.name)
                                    }
                                </Text>

                                <Text style={styles.artist}>
                                    {
                                        Array.isArray(currentSong.payload.artist) ? null : currentSong.payload.artist.name
                                    }
                                </Text>
                            </View>
                        </View>

                        <View style={styles.controls}>
                            {
                                loading ? (
                                    <View style={{width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                                        <ActivityIndicator size={'small'} color="white"/>
                                    </View>
                                ) : (
                                    <TouchableOpacity 
                                        style={{width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}} 
                                        onPress={togglePlaying}
                                    >
                                        {
                                            playing ? <Entypo name='controller-paus' size={30} color='white' /> : <Entypo name='controller-play' size={38} color='white' />
                                        }
                                    </TouchableOpacity>
                                )
                            }

                            <TouchableOpacity 
                                style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}
                                onPress={nextSong}
                            >
                                <Entypo name="controller-next" size={24} color={'white'} style={{opacity: queue.length > 0 ? 1 : 0.5}}/>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <SongTimer playerRef={playerRef}/>

                </LinearGradient>

                {
                    currentSongModal ? <CurrentSongModal/> : null
                }

                <YoutubePlayer
                    ref={playerRef}
                    height={0}
                    play={playing}
                    onReady={(e) => {
                        setPlaying(true)
                    }}
                    videoId={currentSong.payload.videoId}
                    onChangeState={onStateChange}
                />

            </TouchableOpacity>
        ) : null
    )
}

export default PlaybackControls;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: 60,
        zIndex: 1,
        alignItems: 'center',
    },
    playbackControls: {
        width: '97%',
        paddingHorizontal: 5,
        borderRadius: 8,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4
    },
    songInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumbnailsContainer: {
        width: 52,
        height: 52,
        backgroundColor: 'gray',
        borderRadius: 4
    },
    songNameContainer: {
        paddingLeft: 10,
    },
    name: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.textPrimary
    },
    artist: {
        fontSize: 12,
        color: colors.bgElevated
    },
    controls: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})