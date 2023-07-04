import { React } from 'react';
import './ShareStyles.scss';
import { useShare } from './hooks';

export function Share(props) {
    const { shareRef } = props

    const { pngFile, pngFileLoaded } = useShare(shareRef)

    const handleOnShare = async (event) => {
        if (pngFile && pngFileLoaded) {
            const data = {
                files: [pngFile],
                title: "title",
                text: "text",
            };
            try {
                await navigator.share(data);
            } catch (err) {
                console.error(err.name, err.message);
            }
        }
    }


    return (
        <button onClick={(e) => { handleOnShare(e) }}>
            <p>Share</p>
        </button>
    );
}