import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../../api/hooks/useApi';
import { CreateGameInput } from '../../../api/model/CreateGameInput';
import { CreateGameForm } from '../components/CreateGameForm';

type Props = {
  onCreateGame?: (gameId: string) => void;
};
export const CreateGameFormContainer = ({ onCreateGame }: Props) => {
  const api = useApi();
  const {
    mutateAsync: createAndJoinGame,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (createGameInput: CreateGameInput) => {
      const gameDetails = await api.games.createGame(createGameInput);
      await api.games.joinGame(gameDetails.id);
      return gameDetails;
    },
    onSuccess: (data) => {
      if (onCreateGame) {
        onCreateGame(data.id);
      }
    },
  });

  return (
    <CreateGameForm
      onSubmit={(formInput) => createAndJoinGame(formInput)}
      error={error?.message}
      loading={isPending}
    />
  );
};
