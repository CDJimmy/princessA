import Image from 'next/image'
import ReformatArrayPost from './components/helper'

const myLoader = ({src, width, quality}) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    return `${BASE_URL}${src}?w=${width}&q=${quality || 100}`
}

function Collection({ data }) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    var collections = ReformatArrayPost(data)
    {console.log(collections)}
    return (
        <>
        <i class='arrow left'></i>
        <i class='arrow right'></i>
            <div id='collections'>
                <div class='slider'>
                    {collections.map((collec) => (
                        <div class='collection' 
                            id={'collection-'+collec.Titre} 
                            onclick='collectionClickFunction()'>
                            <input type='checkbox' class='img-click' id={collec.Titre} />
                            <label for={collec.Titre}>
                                
                                    <img 
                                        class='picture-collection'
                                        loader={myLoader} 
                                        src={BASE_URL+collec.Photo_principale.url+'?w=1000&h=767'} 
                                        width='1000'
                                        height='667'/>
                                
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Collection
