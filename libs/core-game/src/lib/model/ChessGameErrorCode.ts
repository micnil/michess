export type ChessGameErrorCode =
  | 'game_is_over'
  | 'not_your_turn'
  | 'player_flagged'
  | 'game_not_over'
  | 'not_in_game'
  | 'action_not_available';
