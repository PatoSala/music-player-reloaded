import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

function SongTimer({ songDuration, currentTime}) {

    useEffect(() => {
        console.log('songTimer duration: ', songDuration);
    }, [songDuration])

    return (
        <View style={styles.timeLine}>
            <View style={styles.progressBar}></View>
        </View>
    )
}

export default SongTimer;

const styles = StyleSheet.create({
    timeLine: {
        width: '100%',
        height: 2,
        backgroundColor: 'white',
    },
    progressBar: {
        width: '80%',
        height: 2,
        color: 'white',
        zIndex: 1,
    }
})