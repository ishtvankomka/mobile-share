import { React } from 'react';
import './ShareStyles.scss';
import { useShare } from './hooks';

export function Share(props) {
    const { shareRef, filename } = props

    const { pngFile, pngFileLoaded } = useShare(shareRef, filename)

    const handleOnShare = async (event) => {
        if (pngFile && pngFileLoaded) {
            const data = {
                files: [pngFile]                
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