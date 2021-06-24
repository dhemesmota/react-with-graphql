import { gql, useQuery } from '@apollo/client';

import { AddStar } from './AddStar';
import { RemoveStar } from './RemoveStar';

const reposQuery = gql`
  {
    viewer {
      repositories(last: 5) {
        edges {
          node {
            id
            name
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`;

type IRepository = {
  viewer: {
    repositories: {
      edges: Array<{
        node: {
          id: string;
          name: string;
          email: string;
          viewerHasStarred: boolean;
          stargazers: {
            totalCount: number;
          };
        };
      }>;
    };
  };
};

function Repository() {
  const { loading, error, data, refetch } = useQuery<IRepository>(reposQuery);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  const currentLength = data?.viewer.repositories.edges.length;

  return (
    <div className="repos">
      <h2>First {currentLength} repositories</h2>
      {data?.viewer.repositories.edges.map(({ node }) => (
        <ul className="list" key={node.id}>
          <li>
            {node.name}
            {node.viewerHasStarred ? (
              <RemoveStar id={node.id} refetch={refetch} />
            ) : (
              <AddStar id={node.id} refetch={refetch} />
            )}
          </li>
          <li>stars {node.stargazers.totalCount}</li>
        </ul>
      ))}
      <button type="button" onClick={() => refetch()}>
        Refetch
      </button>
    </div>
  );
}

export { Repository };
