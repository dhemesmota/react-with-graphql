import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

const Remove_Star = gql`
  mutation RemoveStar($repoid: ID!) {
    removeStar(input: { starrableId: $repoid }) {
      starrable {
        stargazers {
          totalCount
        }
        viewerHasStarred
      }
    }
  }
`;

interface IRemoveStarProps {
  id: string;
  refetch: () => void;
}

function RemoveStar({ refetch, id }: IRemoveStarProps) {
  const [removeStar, { loading, error }] = useMutation(Remove_Star);

  const handleRemove = useCallback(() => {
    removeStar({
      variables: { repoid: id },
    }).then(() => {
      refetch();
    });
  }, [refetch, id]);

  return (
    <div>
      <button disabled={loading} type="button" onClick={handleRemove}>
        {loading ? 'processing...' : 'remove star'}
      </button>

      {error && <p>{error.message}</p>}
    </div>
  );
}

export { RemoveStar };
