export type ChessGameErrorCode =
  | 'game_is_over'
  | 'not_your_turn'
  | 'player_flagged'
  | 'not_in_game'
  | 'action_not_available';
