import { useQuery, gql } from '@apollo/client';

import { Repository } from '../components/Repository';

function Home() {
  const { loading, error, data } = useQuery(gql`
    {
      viewer {
        id
        name
        email
      }
    }
  `);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className="App">
      <div>
        <h1>Name: {data.viewer.name}</h1>
        <p>Email: {data.viewer.email}</p>
      </div>

      <Repository />
    </div>
  );
}

export { Home };
