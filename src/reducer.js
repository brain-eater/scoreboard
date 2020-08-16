import {createSlice} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  getInitialTypes,
  teamInitialState,
  updateInitPlayers,
  updateMatchBasicDetails,
} from './reducers/init-reducers';
import {addBall, updateSelectedType} from './reducers/score-reducers';
import {
  updateInitPlayersDialogVisible,
  updateInningsOverDialogVisible,
  updateNextBatsmanDialogVisible,
  updateNextBowlerDialogVisible,
  updateRunsInputDialogVisible,
} from './reducers/dialog-reducers';
import {retire, swap, undo} from './reducers/actions-reducers';
import {
  createNewMatch,
  nextBatsman,
  nextBowler,
} from './reducers/match-reducers';

export const getInitialState = () => ({
  team1: teamInitialState('team1'),
  team2: teamInitialState('team2'),
  battingTeam: 'team1',
  bowlingTeam: 'team2',

  overs: 0,
  innings: 1,

  selectedTypes: getInitialTypes(),
  runsInputDialogVisible: false,
  NextPlayerDialogVisible: false,
  inningsOverDialogVisible: false,
  initPlayersDialogVisible: false,
});

export const matchSlice = createSlice({
  name: 'match',
  initialState: getInitialState(),
  reducers: {
    createNewMatch,
    updateMatchBasicDetails,
    updateInitPlayers,

    addBall,
    updateSelectedType,

    undo,
    swap,
    retire,

    nextBatsman,
    nextBowler,

    updateRunsInputDialogVisible,
    updateNextBatsmanDialogVisible,
    updateNextBowlerDialogVisible,
    updateInitPlayersDialogVisible,
    updateInningsOverDialogVisible,
  },
});

export default combineReducers({
  match: matchSlice.reducer,
});
