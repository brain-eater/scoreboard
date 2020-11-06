import {getPlayerOrNewPlayerIndex, getTeams} from './init-reducers';
import {getInitialState} from '../reducer';
import {handleInningsChange, handleMatchOver} from './score-reducers';

export const createNewMatch = () => getInitialState();

//handle out player name coming again
export const nextBatsman = (state, {payload}) => {
  const {battingTeam} = getTeams(state);
  battingTeam.strikerIndex = getPlayerOrNewPlayerIndex(
    battingTeam,
    payload.name,
  );
  state.nextBatsmanDialogVisible = false;
};

export const nextBowler = (state, {payload}) => {
  const bowlingTeam = getTeams(state).bowlingTeam;
  bowlingTeam.bowlerIndex = getPlayerOrNewPlayerIndex(
    bowlingTeam,
    payload.name,
  );
  state.nextBowlerDialogVisible = false;
  state.needBowlerChange = false;
};

export const endInnings = (state) => {
  if (state.innings === 2) {
    return handleMatchOver(state);
  }
  handleInningsChange(state);
};

export const isAllOut = (team) => team.retiredCounts + team.wickets === 10;
