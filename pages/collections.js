import Image from 'next/image'
import ReformatArrayPost from './components/helper'

const myLoader = ({src, width, quality}) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    return `${BASE_URL}${src}?w=${width}&q=${quality || 100}`
}

function Collection({ data }) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    var collections = ReformatArrayPost(data)
    
    return (
        <>
        <div id='collection-popin'
             onClick={(event) => CloseCollection(collections.length, event)}>
            <div id='collection-popin-content'>
                <div id='collection-popin-img'>
                    <div id='grid-wrapper' onClick={(event) => ZoomPicture(event)}>
                    </div>
                    <div id='slider-play'>
                        
                    </div>
                    <div id='collection-popin-img-title'>
                    </div>
                    <div id='collection-popin-slider-group'>
                        <div className='collection-popin-slider slider-main' data-slider='collection'>
                        </div>
                    </div>
                    
                </div>
                <div id='collection-popin-description'>
                    <h3></h3>
                    <h6></h6>
                </div>
            </div>
            <div id='collection-popin-artworks'>

            </div>
        </div>
        <i className='arrow left' data-active="false"
           onMouseOver={(event) => ScrollSlider(-1, event.target)}
           onMouseLeave={(event) => ScrollSlider(null, event.target)}></i>
        <i className='arrow right' data-active="false"
           onMouseOver={(event) => ScrollSlider(1, event.target)}
           onMouseLeave={(event) => ScrollSlider(null, event.target)}></i>
            <div id='collections'>
                <div className='slider'>
                    {collections.map((collec) => (
                        <div className='collection' 
                            id={'collection-'+collec.Tag}
                            key={'collection-'+collec.Tag}>
                                <img 
                                    id={collec.Tag}
                                    data-selected='false'
                                    onClick={() => OpenCollection(collec)}
                                    className='picture-collection'
                                    //loader={myLoader} 
                                    src={BASE_URL+collec.Photo_principale.url+'?w=1000&h=767'} 
                                    width='1000'
                                    height='667'/>
                                
                        </div>
                    ))}
                    <i style={{position: 'absolute', 
                               height: '1px',
                               width: '1px',
                               left: '180%'}}></i>
                </div>
            </div>
        </>
    )
}

function OpenCollection(collec) {
    // function to open template div and make transition

    document.body.style.overflowY = 'hidden';
    var div_collections = document.getElementById('collections');
    var collections_y = div_collections.offsetTop;
    var container_y = div_collections.closest('.container').offsetTop;
    var previous_scroll_x = div_collections.scrollLeft;
    var img = document.getElementById(collec.Tag);
    var img_x = img.offsetLeft;

    img.filter = 'grayscale(0%)';
    
    window.scrollTo({top: container_y + 20, behavior: 'smooth'});
    div_collections.scrollTo({left: img_x, behavior: 'smooth'});
    
    
    setTimeout(function(){
        img.classList.add('collection-opened')
        
        setTimeout(function(){
            Poping(collec, collections_y - container_y + -10, previous_scroll_x);
        },500);
    },800);
}

function Poping(collec, top, previous_scroll_x) {
    // function to inject selected collection in template div

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    var collection = document.getElementById('collection-popin');
    var div_main = document.getElementById('collection-popin-content');
    var div_text = document.getElementById('collection-popin-description');
    var div_slider_group = document.getElementById('collection-popin-slider-group');
    var _clone = document.getElementById(collec.Tag);

    var div_main_slider = document.getElementsByClassName('collection-popin-slider')[0];
    var div_img_title = document.getElementById('collection-popin-img-title');

    div_text.firstChild.textContent = collec.Titre
    div_text.lastChild.textContent = collec.Description
    div_slider_group.dataset.id = _clone.id
    var new_bg_color = collec.Couleur_fond.slice(0, 3) + 'a' + collec.Couleur_fond.slice(3, -1) + ',0.8)'

    var img = AddPicture(div_main_slider, _clone, collec.Tag + '_' + collec.Photo_principale.id, null, true);

    collection.style.setProperty('color', collec.Couleur_texte || 'rgb(0,0,0)');
    document.documentElement.style.setProperty('--bg-transition', new_bg_color);
    collection.classList.add('selected');
    collection.style.paddingTop = top + 'px';


    // add vertical title on image
    div_img_title.style.backgroundColor = new_bg_color
    div_img_title.style.color = collec.Couleur_texte
    div_img_title.style.display = 'flex'
    for (let index = 0; index < collec.Titre.length; index++) {
        const letter = collec.Titre[index];
        var _p = document.createElement('p');
        _p.innerHTML = letter;
        _p.style.height = `calc(var(--collection-img-zoomed-height-desktop)/${collec.Titre.length})`;
        //_p.style.background = 'url(' + BASE_URL+collec.Photo_principale.url + ')';

        div_img_title.appendChild(_p)
    }
    
    div_main_slider.classList.add('selected');
    img.setAttribute('data-scroll-x', previous_scroll_x);

    // for current collection add artworks in caroussel and in main_view
    var div_artworks = document.getElementById('collection-popin-artworks');
    AddArtworkCaroussel(div_artworks, collec, 'collection', true);
    collec.Oeuvres.map((artwork) => {
        AddArtworkCaroussel(div_artworks, artwork, 'oeuvre-' + artwork.Tag);
        AddArtworkMainView(div_slider_group, artwork, _clone, 'oeuvre-' + artwork.Tag);
    });

    AddGridZoom();

}

function AddArtworkCaroussel(parent, elem, id, selected=false) {
    // function to add artwork in caroussel list

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    var div_artwork = document.createElement('div');
    var img = document.createElement('img');
    var a = document.createElement('a');
    a.href = '#' + elem.Tag + '_' + elem.Photo_principale.id;

    div_artwork.classList.add('artwork')
    img.src = BASE_URL + elem.Photo_principale.url.replace('uploads/', 'uploads/thumbnail_') + '?w=100&h=150'
    img.id = id
    img.width = '1000'
    img.height = '667'
    if (selected) {
        img.classList.add('selected');
    }
    img.onclick = (event) => OpenArtwork(event.target, elem)
    //a.append(img)
    //div_artwork.append(a)
    div_artwork.append(img)
    parent.append(div_artwork)
}

function AddArtworkMainView(parent, artwork, _clone, slider_id) {
    // function to add artwork in main view

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    var popin_slider = document.createElement('div');
    popin_slider.classList.add('collection-popin-slider');
    popin_slider.dataset.slider = slider_id;
    
    var main_id = artwork.Tag + '_' + artwork.Photo_principale.id;
    AddPicture(popin_slider, _clone, main_id, artwork.Photo_principale.url);
    artwork.Photos.map((picture) => {
        var _id = artwork.Tag + '_' + picture.id;
        AddPicture(popin_slider, _clone, _id, picture.url);
    });
    /*
    if (artwork.Video != null) {

    }
    */
    parent.append(popin_slider);

}
function AddPicture(parent, to_clone, id, url=null, first=false) {
    var _pic = to_clone.cloneNode();
    _pic.id = id;
    _pic.dataset.selected = 'false'
    _pic.classList.remove('picture-collection');
    _pic.classList.remove('collection-opened');
    _pic.classList.add('picture-artwork-slider');

    parent.append(_pic);

    if (first) {
        _pic.dataset.selected = 'first'
    } else {
        _pic.src = _pic.src.split('/uploads/')[0] + url;
    }

    return _pic;
}

function AddGridZoom() {
    var group = document.getElementById('grid-wrapper');
    if (group.children.length != 0) {
        return;
    }
    for (let i = 0; i < 150; i++) {
        var _grid = document.createElement('div');
        _grid.classList.add('grid-item');
        group.append(_grid);
    }
}

function ZoomPicture() {
    var group = document.getElementById('grid-wrapper');
    var _existed_imgs = group.querySelectorAll('img');
    if (_existed_imgs.length > 0) {
        _existed_imgs.forEach(_img => {
            console.log(_img)
            group.removeChild(_img);
        });
    }

    if (group.classList.contains('zoomed')) {
        group.classList.remove('zoomed');

    } else {
        group.classList.add('zoomed');
        var _div_first = document.querySelectorAll('.picture-artwork-slider[data-selected=first]')
        if (_div_first.length == 0) {
            var _clone = document.querySelectorAll('.picture-artwork-slider[data-selected=true]')[0].cloneNode();
        } else {
            var _clone =_div_first[0].cloneNode();
        }
        group.append(_clone);
    }
}


function OpenArtwork(clickedElement, obj) {
    // function to open in main view a selected artwork in caroussel

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    var group_target = document.querySelectorAll('.collection-popin-slider[data-slider='+ clickedElement.id +']')[0];
    var group_current = document.querySelectorAll('.collection-popin-slider.selected')[0];
    if (group_target == group_current) {
        return;
    }
    
    group_target.classList.add('selected');
    var _div_first = document.querySelectorAll('.picture-artwork-slider[data-selected=first]')
   

    if (_div_first.length == 0) {
        var picture_current = group_current.querySelectorAll('.picture-artwork-slider[data-selected=true]')[0];
    } else {
        var picture_current =_div_first[0];
    }
    
    ManageTransitionArtwork(picture_current)

    var img_target = group_target.children[0]
    img_target.dataset.selected = 'true'

    var div_artworks = document.getElementById('collection-popin-artworks');
    var div_selected = div_artworks.querySelectorAll('.selected')[0];
    var img_title = document.getElementById('collection-popin-img-title');
    div_selected.classList.remove('selected');
    clickedElement.classList.add('selected');

    var div_text = document.getElementById('collection-popin-description');
    div_text.firstChild.textContent = obj.Titre;
    div_text.lastChild.textContent = obj.Description;

    var group = document.getElementById('grid-wrapper');
    group.classList.remove('zoomed');
    var _existed_imgs = group.querySelectorAll('img');
    if (_existed_imgs.length > 0) {
        Array.from(_existed_imgs).map((_img) => {
            group.removeChild(_img);
        });
    }

    /*
    var div_img = document.getElementById('collection-popin-img');
    var img = div_img.querySelectorAll('img')[0];
    img.src = BASE_URL + obj.Photo_principale.url + '?w=1000&h=767'
    console.log(obj.Photo_principale)
    */
    if(clickedElement.id == 'collection') {
        img_title.style.display = 'flex';
        var slider_play = document.getElementById('slider-play');
        slider_play.classList.remove('slide-active');

    } else {
        img_title.style.display = 'none';

        var slider_play = document.getElementById('slider-play');
        slider_play.classList.add('slide-active');
        AutoSlideArtworks(img_target);
    }

    setTimeout(function(){
        group_current.classList.remove('selected');
            var _waiteds = group_current.querySelectorAll('.picture-artwork-slider');
            if (_waiteds.length > 0) {
                Array.from(_waiteds).map((_waited) => {
                    _waited.dataset.selected = 'false';
                    _waited.removeEventListener('animationend', RemoveWaiting);
                });
            }
        /*
        var _zoomeds = group_current.querySelectorAll('.picture-artwork-slider[data-zoomed=true]');
        if (_zoomeds.length > 0) {
            Array.from(_zoomeds).map((_zoomed) => {
                _waited.dataset.zoomed = 'false';
            });
        }
        */
    },800);

}

function AutoSlideArtworks(artwork) {
    // Slide automatic between all pics and video of current artwork
    next = artwork.nextElementSibling;
    if (next == null) {
        next = artwork.parentElement.firstChild;
    }
    setTimeout(function(){
        // apply only if curent picture is used yet
        if (document.getElementById(artwork.id) == null) {
            return;
        }

        var grid = document.getElementById('grid-wrapper');
        var slider_play = document.getElementById('slider-play');
        if (grid.matches(':hover') || slider_play.matches(':hover')) {
            AutoSlideArtworks(artwork);

        } else if (artwork.dataset.selected == 'true') {
            ManageTransitionArtwork(artwork);

            next.dataset.selected = 'true';
            grid.classList.remove('zoomed');
            AutoSlideArtworks(next);
        }
    },3000);

}

function ManageTransitionArtwork(previous) {
    // when you change of artwork or picture of it, you should manage transition between previous and new one
    // 'waited' draft step is use to add transition then remove by 'false'

    previous.dataset.selected = 'waited';
    // previous.dataset.zoomed = 'false';
    previous.addEventListener('animationend', RemoveWaiting);
}

function RemoveWaiting(event) {
    if(event.animationName == "anim-unslide"){
        event.target.dataset.selected = 'false';
        event.target.removeEventListener('animationend', RemoveWaiting);
    }
}

function CloseCollection(nb_collection, event) {
    // function to close collection, re-templatise the div by remove specific data
    // and make transition
    var collection = document.getElementById('collection-popin');
    var div_slider = document.getElementById('collection-popin-slider-group');
    
    if (event.target != collection) {
        return;
    }
    var id = div_slider.dataset.id
    collection.classList.remove('selected');

    var _waiteds = document.querySelectorAll('.picture-artwork-slider');
    if (_waiteds.length > 0) {
        Array.from(_waiteds).map((_waited) => {
            _waited.dataset.selected = 'false';
            _waited.removeEventListener('animationend', RemoveWaiting);
        });
    }

    var slider_play = document.getElementById('slider-play');
        slider_play.classList.remove('slide-active')

    setTimeout(function(){
        var div_img_title = document.getElementById('collection-popin-img-title');
        Array.from(div_img_title.children).map((_p) => {
            div_img_title.removeChild(_p);
        });
        var div_artworks = document.getElementById('collection-popin-artworks');
        Array.from(div_artworks.children).map((_artwork) => {
            div_artworks.removeChild(_artwork);
        });
        collection.classList.remove('unselected');
        collection.style.paddingTop = '0px';

        Array.from(div_slider.children).map((_slider) => {
            if (_slider.classList.contains('slider-main')) {
                _slider.removeChild(_slider.firstChild)
            } else {
                div_slider.removeChild(_slider);
            }
        });
        var img = document.getElementById(id);
        img.classList.remove('collection-opened');
        var group = document.getElementById('grid-wrapper');
        group.classList.remove('zoomed');
        var _existed_imgs = group.querySelectorAll('img');
        if (_existed_imgs.length > 0) {
            Array.from(_existed_imgs).map((_img) => {
                group.removeChild(_img);
            });
        }

        setTimeout(function(){
            document.body.style.overflowY = 'overlay';
        },800);
    },1000);

}

function ScrollSlider(direction, target) {
    // function to create scrolling to navigate in all collections with arrows

    if (target.dataset.active == "false" && direction != null){
        var div_collections = document.getElementById('collections');
        var current_scroll_x = div_collections.scrollLeft;
        var nodes = div_collections.querySelectorAll('.slider > .collection');
        var last_collection = nodes[nodes.length- 1];
        var limit = last_collection.offsetLeft + last_collection.offsetWidth - div_collections.offsetWidth;
        var i = current_scroll_x;
        var interval = 600 * direction;


        var values = [];
        while ((i > 0 && direction == -1)||
                (i < limit && direction == 1)) {
            if (i + interval < 0) {
                i = 0
            } else if (i + interval > limit) {
                i = limit
            } else {
                i += interval
            }
            values.push(i)
        }
        target.dataset.active = "true"
        Scrolling(values, 0, div_collections, target)
    } else if (direction == null) {
        target.dataset.active = "false"
    }
}

function Scrolling(values, j, div, target) {
    // function recursive to scroll from current position to target

    if (j >= values.length) {
        return;
    }
    div.scrollTo({left: values[j], behavior: 'smooth'});
    setTimeout(function(){
        if (target.dataset.active == "true") {
            j += 1;
            Scrolling(values, j, div, target);
        }
    },200);
}


export default Collection
