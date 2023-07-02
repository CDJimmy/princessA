import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {ssr: false});

function VideoLogo() {
// Render a YouTube video player

    return (
        <VideoPlayer />
    )
}


export default VideoLogo

