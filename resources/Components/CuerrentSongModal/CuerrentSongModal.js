import { Modal } from "react-native"

export default function CurrentSongModal() {
    const currentSong = useSelector((state) => state.currentSong.value);
    console.log(currentSong);

    return (
        <Modal
            visible
        >

        </Modal>
    )
}