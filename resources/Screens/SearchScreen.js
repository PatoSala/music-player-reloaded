import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import YoutubeMusicApi from 'youtube-music-api';
import colors from '../Style/Colors';

const api = new YoutubeMusicApi();

// Components
import SearchHeader from '../Components/SearchEngine/SearchHeader';
import EmptySearch from '../Components/SearchEngine/EmptySearch';
import SearchResults from '../Components/SearchEngine/SearchResults';

function SearchScreen() {

    const isMounted = useRef(false);

    const [value, setValue] = useState('');
    const [searchResults, setSearchResults] = useState([])

    let setSearchValue = (value) => {
        setValue(value);
    }

    let clearResults = () => {
        setSearchResults([]);
    }

    useEffect(() => {
        if (value !== '') {
            api.search(value, "song").then(result => {
                /*{content: [
                    {
                        type: 'song', videoId: 'kvoO5hwsYQo', playlistId: 'RDAMVMkvoO5hwsYQo', name: 'ne deve ne kush', artist: [Array], album: [Object], duration: 159000, thumbnails: [Array], params: 'wAEB'
                    },
                    {
                        type: 'video', videoId: 'sixP2AyFOjY', playlistId: 'RDAMVMsixP2AyFOjY', name: 'Büyük Ev Ablukada - Ne Deve Ne Kush (Mutsuz Parti Şekli)', author: 'Mustafa TAŞ', views: '993 views', duration: 12000, thumbnails: [Array], params: 'wAEB'
                    },
                    {
                        type: 'single', browseId: 'MPREb_9TuSrHElFSO', playlistId: 'OLAK5uy_mj-G8ekrTNJbudAD6ehLFM8cW3yezUEe8', name: 'ne deve ne kush', artist: 'Büyük Ev Ablukada, Ezhel', year: '2019', thumbnails: [Array]
                    },
                    {
                        type: 'artist', browseId: 'UCCvxgd2z194wYgpBt-sajrA', name: 'Büyük Ev Ablukada', thumbnails: [Array]
                    },
                    {
                        type: 'playlist', browseId: 'VLPLTw3BBwcLBjG-4fernx2Xt-GHdYMPYAFM', title: 'ne deve ne kush Radio', author: 'Ateş Tan', count: 51, thumbnails: [Array]
                    },
                    ....
                    ]
                }*/
                setSearchResults(result.content);
            })
        }
    }, [value]);

    useEffect(() => {
        api.initalize();
    }, []);

    return (
        <>
            <View style={styles.container}>
            
                <SearchHeader
                    setSearchValue={setSearchValue}
                    clearResults={clearResults}
                />

                {
                    searchResults.length === 0 ? <EmptySearch/> : <SearchResults results={searchResults}/>
                }

            </View>
        </>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.bgPrimary,
    },
});