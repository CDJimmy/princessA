import ReactPlayer from "react-player/lazy";
import { useRef } from 'react';


function VideoPlayer() {
    const myRef = useRef(null);

    function InitPage(){
        window.scrollTo(0, 55)
        document.body.style.overflowY="hidden"
        setTimeout(function(){
            var div_video = document.getElementById('section-video');
            var div_display = document.getElementById('video-display');
            div_video.style.height = window.outerHeight;
            div_video.style.width = window.outerWidth;
            div_display.style.height = window.outerHeight;
            div_display.style.width = window.outerWidth;

            div_display.addEventListener('click', ()=>{
                EndPlayer();
            })
        },500);
    }
    function EndPlayer(){
        document.body.style.overflowY="overlay"
        var div_video = document.getElementById('section-video');
        var div_display = document.getElementById('video-display');
        //div_display.style.backgroundColor="black"
        div_video.style.transition= 'height 1s';
        div_video.style.height = '0px'
        
        setTimeout(function(){
            div_video.style.transition= '';
            document.getElementsByTagName('header')[0].style.display="block"
            window.scrollTo(0, 0)
            div_display.removeEventListener('click', null);
            div_display.style.display="none"

        },900);
    }

    return (
        <div ref={myRef}>
            <div id="video-display">
            <div id="skip-video-arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </div>
            <ReactPlayer 
                url='https://youtu.be/MXTj7MxJDmM' 
                muted
                width='100%'
                height='100%'
                config={{
                    youtube: {
                        playerVars: { 
                            autoplay: 1,
                            cc_load_policy: 0,
                            controls: 0,
                            disablekb: 1,
                            fs: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0
                        }
                    }
                }}
                onPlay={InitPage()}
                onEnded={EndPlayer}
            />
        </div>
    );
}

export default VideoPlayer