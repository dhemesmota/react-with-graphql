import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

const ADD_STAR = gql`
  mutation AddStar($repoid: ID!) {
    addStar(input: { starrableId: $repoid }) {
      starrable {
        stargazers {
          totalCount
        }
        viewerHasStarred
      }
    }
  }
`;

interface IAddStarProps {
  id: string;
  refetch: () => void;
}

function AddStar({ refetch, id }: IAddStarProps) {
  const [addStar, { loading, error }] = useMutation(ADD_STAR);

  const handleAddStar = useCallback(() => {
    addStar({
      variables: { repoid: id },
    }).then(() => {
      refetch();
    });
  }, [refetch, id]);

  return (
    <div>
      <button type="button" onClick={handleAddStar}>
        {loading ? 'processing...' : 'Add star'}
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export { AddStar };
