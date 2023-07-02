import fetch from 'isomorphic-unfetch'
import Collection from './collections'
import World from './worlds'

const Home = ({ data_collection, data_continent }) => {
  return (
    <>
      <section id='section-world'>
        <div className='container'>
          <h1>PrincessA World</h1>
          <div id='worlds'>
            <World data={ data_continent }/>
          </div>
        </div>
      </section>
      <section id='section-art'>
        <div className='container'>
          <h1>Artworks</h1>
            <Collection data={ data_collection }/>
        </div>
      </section>
      <section id='section-shop'>
        <div className='container'>
          <h1>Shop</h1>

        </div>
      </section>
      <section id='section-contact'>
        <div className='container'>
          <h1>Contact</h1>

        </div>
      </section>
    
    </>
   
  );
};

export async function getServerSideProps() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  console.log(API_URL);
  var url_colleciton = "collections" + 
            "?fields[0]=id" +
            "&fields[1]=Titre" +
            "&fields[2]=Description" +
            "&fields[3]=Ordre" +
            "&fields[4]=Tag" +
            "&fields[5]=Couleur_fond" +
            "&fields[6]=Couleur_texte" +
            "&populate[Photo_principale][fields][0]=url" +
            "&populate[Oeuvres][fields][0]=Titre" +
            "&populate[Oeuvres][fields][1]=Description" +
            "&populate[Oeuvres][fields][2]=Date_creation" +
            "&populate[Oeuvres][fields][3]=Louable" +
            "&populate[Oeuvres][fields][4]=Tag" +
            "&populate[Oeuvres][populate][0]=Photo_principale" +
            "&populate[Oeuvres][populate][Photo_principale][fields][0]=url" +
            "&populate[Oeuvres][populate][0]=Video" +
            "&populate[Oeuvres][populate][Video][fields][0]=url" +
            "&populate[Oeuvres][populate][0]=Photos" +
            "&populate[Oeuvres][populate][Photos][fields][0]=url"

  var url_continent = "continents" +
            "?fields[0]=id" + 
            "&fields[1]=Titre" +
            "&populate[Pays][fields][0]=id" +
            "&populate[Pays][fields][1]=Titre" +
            "&populate[Pays][populate][Positions][fields][0]=id" +
            "&populate[Pays][populate][Positions][fields][1]=Titre" +
            "&populate[Pays][populate][Positions][fields][2]=Tag" +
            "&populate[Pays][populate][Positions][fields][3]=Description" +
            "&populate[Pays][populate][Positions][fields][5]=Latitude" +
            "&populate[Pays][populate][Positions][fields][6]=Longitude" +
            "&populate[Pays][populate][Positions][populate][Photos][fields][0]=url"


  const res_collection = await fetch(`${API_URL}/${url_colleciton}`)
  const data_collection = await res_collection.json()

  const res_continent = await fetch(`${API_URL}/${url_continent}`)
  const data_continent = await res_continent.json()

  return {
    props: { data_collection, data_continent }
  }
}

export default Home