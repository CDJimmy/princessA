import fetch from 'isomorphic-unfetch'
import Image from 'next/image'

// posts will be populated at build time by getStaticProps()
const Collection = ({ collections }) => {
  const { API_URL } = process.env
  return (
    <div>
      {collections.map(col => (
        <div key={col.id}>
          {col.titre}
          <Image
            src=""
            alt="Landscape picture"
          />
        </div>
      ))}
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const { API_URL } = process.env

  const res = await fetch(`${API_URL}/api/collections`)
  const data = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {collections: data}
  }
}

export default Collection