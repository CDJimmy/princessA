import createGlobe from "cobe";
import ReformatArrayPost from './components/helper'
import { useEffect, useRef } from "react";


function World({ data }) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    var continents = ReformatArrayPost(data)
    
    const canvasRef = useRef();
    const phiAddRef = useRef(0);
    const phiRef = useRef(4.75) ;

    var _markers = []
    continents.map((cont) => (
        cont.Pays.map((pays) => (
            pays.Positions.map((position) => (
                _markers.push({"location": [position.Latitude, position.Longitude], "size": 0.06})
            ))
        ))
    ))

    useEffect(() => {
        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 1,
            width: 1000,
            height: 1000,
            phi: 4.75,
            theta: 0.14,
            dark: 1,
            diffuse: 2.17,
            scale: 1,
            offset: [0, 0],
            mapSamples: 56750,
            mapBrightness: 8.35,
            baseColor: [24/255, 34/255, 89/255],
            markerColor: [251/255, 151/255, 245/255],
            glowColor: [29/255, 30/255, 57/255],
            markers: _markers,
            
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phiRef.current;
                phiRef.current += phiAddRef.current;
            }
        });
    
        return () => {
            globe.destroy();
        };
    }, []);

    

        /*
        export function Cobe() { 
            const canvasRef = useRef() 
            const locationToAngles = (lat, long) => { 
                return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180] 
            } 
            const focusRef = useRef([0, 0]) 
            useEffect(() => { 
                let width = 0; 
                let currentPhi = 0; 
                let currentTheta = 0; 
                const doublePi = Math.PI * 2; 
                const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth) 
                window.addEventListener('resize', onResize) 
                onResize() 
                const globe = createGlobe(canvasRef.current, { 
                    devicePixelRatio: 2, 
                    width: width * 2, 
                    height: width * 2, 
                    phi: 0, 
                    theta: 0.3, 
                    dark: 1, 
                    diffuse: 3, 
                    mapSamples: 16000, 
                    mapBrightness: 1.2, 
                    baseColor: [1, 1, 1], 
                    markerColor: [251 / 255, 200 / 255, 21 / 255], 
                    glowColor: [1.2, 1.2, 1.2], 
                    markers: [ { location: [37.78, -122.412], size: 0.1}, 
                                { location: [52.52, 13.405], size: 0.1}, 
                                { location: [35.676, 139.65], size: 0.1}, 
                                { location: [-34.60, -58.38], size: 0.1}, ], 
                    onRender: (state) => { 
                        state.phi = currentPhi 
                        state.theta = currentTheta 
                        const [focusPhi, focusTheta] = focusRef.current 
                        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi 
                        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi 
                        // Control the speed 
                        if (distPositive < distNegative) { 
                            currentPhi += distPositive * 0.08 
                        } 
                        else { 
                            currentPhi -= distNegative * 0.08 
                        } 
                        currentTheta = currentTheta * 0.92 + focusTheta * 0.08 
                        state.width = width * 2 
                        state.height = width * 2 
                    } 
                });
                setTimeout(() => canvasRef.current.style.opacity = '1') 
                return () => globe.destroy() 

            }, []);
        return (
            <>
                <div style={{ width: '100%', maxWidth: 600, aspectRatio: 1, margin: 'auto', position: 'relative', }}> 
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', contain: 'layout paint size', opacity: 0, transition: 'opacity 1s ease', }} /> 
                    <div className="flex justify-center control-buttons" style={{ gap: '.5rem' }}> 
                        Rotate to: 
                        <button onClick={() => { focusRef.current = locationToAngles(37.78, -122.412) }}/>
                        San Francisco 
                        <button onClick={() => { focusRef.current = locationToAngles(52.52, 13.405) }}/>
                        Berlin 
                        <button onClick={() => { focusRef.current = locationToAngles(35.676, 139.65) }}/>
                        Tokyo 
                        <button onClick={() => { focusRef.current = locationToAngles(-34.60, -58.38) }}/>
                        Buenos Aires
                    </div>
                </div>
            </>
        )

    }
    */
  
    return (
        <>
        <div className="world-container">
            <div id="world-close"
                onClick={() => {
                    phiAddRef.current = 0; 
                    phiRef.current = 4.7; 
                    CloseWorld();
                }}>
                <span></span>
                <span></span>
            </div>
            <div id="world-button-left"
                onMouseEnter={() => ShowWorld()}
                onMouseLeave={() => HideWorld()}
                onClick={() => OpenWorld()}>
                <span>Artiste</span>
            </div>
            <div id="world-button-right"
                onMouseEnter={() => ShowWorld(false)}
                onMouseLeave={() => HideWorld(false)}
                onClick={() => {
                    OpenWorld(false);
                    phiAddRef.current = 0.005;
                    setTimeout(function(){
                        var _map = document.getElementById('world-map');
                        _map.dataset.open = 'true';
                        _map.parentNode.parentNode.dataset.open = 'true';
                
                    },800);
                     
                }}>
                <span>Monde</span>
            </div>
            <div className="world-group world-left" id='artist'>
                <div className="world-child">
                </div>
            </div>
            <div className="world-group world-right" id='around'>
                <div className="world-child" data-open='false'>
                    <div>
                        <div id="stars">
                            <div id="stars1"></div>
                            <div id="stars2"></div>
                            <div id="stars3"></div>
                        </div>
                        <canvas
                            id='world-map'
                            data-open='false'
                            //onClick={() => {phiAddRef.current = RunWorld()}}
                            ref={canvasRef}
                            />
                    </div>
                </div>
                <div id="continents">
                    {continents.map((cont) => (
                        <ul className='continent' id={'continent-'+cont.Tag}>
                            <li>{cont.Titre}</li>
                            {cont.Pays.map((pays) => (
                                <ul className='pays' id={'pays-'+pays.Tag}>
                                    <li>— {pays.Titre}</li>
                                    {pays.Positions.map((position) => (
                                        <ul className='positions' id={'position-'+position.Tag}>
                                            <li>📍 {position.Titre}</li>
                                        </ul>
                                    ))}
                                </ul>
                            ))}
                        </ul>
                    ))}

                </div>
            </div>
        </div>
        </>
    )
}

function RunWorld(current) {
    return 0.005;
}



function ShowWorld(is_left=true) {
	//
	var div_left = document.getElementById('artist');
	var div_right = document.getElementById('around');
	if (is_left) {
		div_left.style.setProperty('--world-left-width-move', '60vw');
		div_right.style.setProperty('--world-right-width-move', '40vw');
		div_right.style.setProperty('--world-margin-left-move', '60vw');
		var _child = div_left.children[0];
	} else {
		div_left.style.setProperty('--world-left-width-move', '40vw');
		div_right.style.setProperty('--world-right-width-move', '60vw');
		div_right.style.setProperty('--world-margin-left-move', '40vw');
		var _child = div_right.children[0];
	}
	_child.style.setProperty('--world-left-width-move', '60vw');
	
	div_left.style.setProperty('animation', 'anim-left-world 0.5s forwards');
	_child.style.setProperty('animation', 'anim-left-world 0.5s forwards');
	div_right.style.setProperty('animation', 'anim-right-world 0.5s forwards');
}

function HideWorld(is_left=true) {
	// 
	var div_left = document.getElementById('artist');
	var div_right = document.getElementById('around');
	var div_close = document.getElementById('world-close')
	if(div_close.dataset.open == 'true') {
		return;
	}
	div_left.style.setProperty('--world-left-width-move', '50vw');
	div_right.style.setProperty('--world-right-width-move', '50vw');
	div_right.style.setProperty('--world-margin-left-move', '50vw');
	
	if (is_left) {
		div_left.style.setProperty('--world-left-width-current', '60vw');
		div_right.style.setProperty('--world-right-width-current', '40vw');
		div_right.style.setProperty('--world-margin-left-current', '60vw');
		var _child = div_left.children[0];
	} else {
		div_left.style.setProperty('--world-left-width-current', '40vw');
		div_right.style.setProperty('--world-right-width-current', '60vw');
		div_right.style.setProperty('--world-margin-left-current', '40vw');
		var _child = div_right.children[0];
	}
	_child.style.setProperty('--world-left-width-move', '50vw');
	_child.style.setProperty('--world-left-width-current', '60vw');
	
	div_left.style.setProperty('animation', 'anim-reverse-left-world 0.5s forwards');
	_child.style.setProperty('animation', 'anim-reverse-left-world 0.5s forwards');
	div_right.style.setProperty('animation', 'anim-reverse-right-world 0.5s forwards');
}

function OpenWorld(is_left=true) {
	// 
    document.body.style.overflowY = 'hidden';
	var div_left = document.getElementById('artist');
	var div_right = document.getElementById('around');
	var div_close = document.getElementById('world-close');
	var button_left = document.getElementById('world-button-left');
	var button_right = document.getElementById('world-button-right');

    var container_y = div_close.closest('.world-container').offsetTop;
    window.scrollTo({top: container_y + 20, behavior: 'smooth'});

	if (is_left) {
		div_left.dataset.open = 'true';
		
		div_left.style.setProperty('--world-left-width-move', '100vw');
		div_right.style.setProperty('--world-right-width-move', '0vw');
		div_right.style.setProperty('--world-margin-left-move', '100vw');
		
		div_left.style.setProperty('--world-left-width-current', '60vw');
		div_right.style.setProperty('--world-right-width-current', '40vw');
		div_right.style.setProperty('--world-margin-left-current', '60vw');
		var _child = div_left.children[0];
	} else {
		div_right.dataset.open = 'true';
		
		div_left.style.setProperty('--world-left-width-move', '0vw');
		div_right.style.setProperty('--world-right-width-move', '100vw');
		div_right.style.setProperty('--world-margin-left-move', '0vw');
		
		div_left.style.setProperty('--world-left-width-current', '40vw');
		div_right.style.setProperty('--world-right-width-current', '60vw');
		div_right.style.setProperty('--world-margin-left-current', '40vw');
		var _child = div_right.children[0];
        document.getElementById('continents').style.display="block";
        document.getElementById('stars').style.display="block";
	}
	_child.style.setProperty('--world-left-width-move', '100vw');
	_child.style.setProperty('--world-left-width-current', '60vw');
	
	div_left.style.setProperty('animation', 'anim-reverse-left-world 0.5s forwards');
	_child.style.setProperty('animation', 'anim-reverse-left-world 0.5s forwards');
	div_right.style.setProperty('animation', 'anim-reverse-right-world 0.5s forwards');
	div_close.dataset.open = 'true';
	button_left.dataset.open = 'false';
	button_right.dataset.open = 'false';


}

function CloseWorld() {
    var _map = document.getElementById('world-map');
    _map.dataset.open = 'false';
    _map.parentNode.parentNode.dataset.open = 'false';


	var div_left = document.getElementById('artist');
	var div_right = document.getElementById('around');
	var div_close = document.getElementById('world-close');
	var button_left = document.getElementById('world-button-left');
	var button_right = document.getElementById('world-button-right');

	if (div_left.dataset.open == 'true') {
		div_left.dataset.open = 'false'
		
		div_left.style.setProperty('--world-left-width-current', '100vw');
		div_right.style.setProperty('--world-right-width-current', '00vw');
		div_right.style.setProperty('--world-margin-left-current', '100vw');
		var _child = div_left.children[0];
	} else {
		div_right.dataset.open = 'false'
		
		div_left.style.setProperty('--world-left-width-current', '0vw');
		div_right.style.setProperty('--world-right-width-current', '100vw');
		div_right.style.setProperty('--world-margin-left-current', '0vw');
		var _child = div_right.children[0];
        document.getElementById('continents').style.display="none";
        document.getElementById('stars').style.display="none";
	}
	div_left.style.setProperty('--world-left-width-move', '50vw');
	div_right.style.setProperty('--world-right-width-move', '50vw');
	div_right.style.setProperty('--world-margin-left-move', '50vw');
	_child.style.setProperty('--world-left-width-move', '50vw');
	_child.style.setProperty('--world-left-width-current', '100vw');
	
	div_left.style.setProperty('animation', 'anim-close-left-world 1s forwards');
	_child.style.setProperty('animation', 'anim-close-left-world 1s forwards');
	div_right.style.setProperty('animation', 'anim-close-right-world 1s forwards');
	div_close.dataset.open = 'false';
	button_left.dataset.open = 'true';
	button_right.dataset.open = 'true';

    document.body.style.overflowY = 'overlay';
}


export default World