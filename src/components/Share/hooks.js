import { toPng } from 'html-to-image';
import { useEffect, useState } from 'react';

export const useShare = (shareRef) => {

    const [pngUrl, setPngUrl] = useState(null)
    useEffect(() => {
        if (shareRef)
            toPng(shareRef.current, { cacheBust: false })
                .then((dataUrl) => {
                    setPngUrl(dataUrl)
                })
    }, [shareRef])

    const [pngBlob, setPngBlob] = useState(null)
    useEffect(() => {
        if (pngUrl?.length) {
            var byteString;
            if (pngUrl.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(pngUrl.split(',')[1]);
            else
                byteString = unescape(pngUrl.split(',')[1]);
            var mimeString = pngUrl.split(',')[0].split(':')[1].split(';')[0];
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            setPngBlob(new Blob([ia], { type: mimeString }))
        }
    }, [pngUrl])

    const [pngFile, setPngFile] = useState(null)
    const [pngFileLoaded, setPngFileLoaded] = useState(false)
    useEffect(() => {
        if (pngBlob)
            setPngFile(
                new File([pngBlob], "file.png", {
                    type: "image/png",
                })
            )
            setPngFileLoaded(true)
    }, [pngBlob])

    return {
        pngFile,
        pngFileLoaded
    }
}