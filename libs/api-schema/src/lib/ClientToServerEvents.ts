import { EventResponse } from './common/EventResponse';
import { GameDetailsResponseV1 } from './game/GameDetailsResponseV1';
import { JoinGamePayloadV1 } from './game/JoinGamePayloadV1';
import { LeaveGamePayloadV1 } from './game/LeaveGamePayloadV1';
import { MakeActionPayloadV1 } from './game/MakeActionPayloadV1';
import { MakeMovePayloadV1 } from './game/MakeMovePayloadV1';
import { MakeMoveResponseV1 } from './game/MakeMoveResponseV1';

export type ClientToServerEvents = {
  'make-move': (
    move: MakeMovePayloadV1,
    callback: (response: MakeMoveResponseV1) => void,
  ) => void;
  'join-game': (
    joinGamePayload: JoinGamePayloadV1,
    callback: (response: GameDetailsResponseV1) => void,
  ) => void;
  'leave-game': (
    leaveGamePayload: LeaveGamePayloadV1,
    callback: (response: EventResponse<void>) => void,
  ) => void;
  'make-action': (
    actionPayload: MakeActionPayloadV1,
    callback: (response: GameDetailsResponseV1) => void,
  ) => void;
};
