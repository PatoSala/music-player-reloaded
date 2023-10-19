import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

function SongTimer({ playerRef}) {
    const [duration, setDuration] = useState(null);
    const [width, setWidth] = useState('0%');

    playerRef.current.getDuration().then((duration) => {
        setDuration(duration);
    });

    const calcWidth = (duration, elapsed) => {
        let width = (elapsed * 100) / duration;
        setWidth(`${width.toFixed(3)}%`)
    }

    useEffect(() => {
        const interval = setInterval(async () => {elapsed_sec
            const elapsed_sec = await playerRef.current.getCurrentTime(); // this is a promise. dont forget to await
      
            calcWidth(duration, elapsed_sec)
        }, 100);

        return (() => {
            clearInterval(interval)
        })
          
    }, [])

    return (
        <View style={[styles.timeLine, { width: width }]}>
        </View>
    )
}

export default SongTimer;

const styles = StyleSheet.create({
    timeLine: {
        height: 2,
        backgroundColor: 'white',
    },
    progressBar: {
        width: 0,
        height: 2,
        color: 'white',
        zIndex: 1,
    }
})