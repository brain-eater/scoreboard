const newPlayer = (name) => ({
  name,
  batting: {
    runs: 0,
    balls: 0,
    fours: 0,
    sixers: 0,
    strikeRate: 0,
    isOut: false,
    isRetired: false,
  },
  bowling: {balls: 0, maidens: 0, runs: 0, wickets: 0, economyRate: 0},
  fielding: {catches: 0, runOuts: 0, stumpings: 0},
});

export const teamInitialState = (name) => ({
  name,
  runs: 0,
  wickets: 0,
  retiredCounts: 0,
  balls: 0,
  players: [],
  strikerIndex: null,
  nonStrikerIndex: null,
  bowlerIndex: null,
  needBowlerChange: false,
});

export const updateMatchBasicDetails = (state, {payload}) => {
  state.team1.name = payload.team1Name;
  state.team2.name = payload.team2Name;
  state.overs = payload.overs;

  state.tossWonByTeam = payload.tossWonByTeam;
  state.selected = payload.selected;
  if (payload.tossWonByTeam === 1) {
    state.battingTeam = payload.selected === 'batting' ? 'team1' : 'team2';
    state.bowlingTeam = payload.selected === 'batting' ? 'team2' : 'team1';
  } else {
    state.bowlingTeam = payload.selected === 'batting' ? 'team1' : 'team2';
    state.battingTeam = payload.selected === 'batting' ? 'team2' : 'team1';
  }
  //show init players dialog
  state.initPlayersDialogVisible = true;
};

export const updateInitPlayers = (state, {payload}) => {
  const {striker, nonStriker, bowler} = payload;
  const {battingTeam, bowlingTeam} = getTeams(state);

  battingTeam.strikerIndex = getPlayerOrNewPlayerIndex(battingTeam, striker);
  battingTeam.nonStrikerIndex = getPlayerOrNewPlayerIndex(
    battingTeam,
    nonStriker,
  );
  bowlingTeam.bowlerIndex = getPlayerOrNewPlayerIndex(bowlingTeam, bowler);

  state.initPlayersDialogVisible = false;
  state.inningsOverDialogVisible = false;
  state.needInningsChange = false;
};

export const getInitialTypes = () => ({
  wide: false,
  noBall: false,
  byes: false,
  legByes: false,
  wicket: false,
});

//getters
export const getTeams = (state) => {
  const battingTeam = state[state.battingTeam];
  const bowlingTeam = state[state.bowlingTeam];
  return {battingTeam, bowlingTeam};
};

export const getStriker = (team) => {
  return team.players[team.strikerIndex];
};

export const getNonStriker = (team) => {
  return team.players[team.nonStrikerIndex];
};

export const getCurrentBowler = (team) => {
  return team.players[team.bowlerIndex];
};

export const getPlayerOrNewPlayerIndex = (team, name) => {
  let index = team.players.findIndex((player) => player.name === name);
  if (index === -1) {
    team.players.push(newPlayer(name));
    index = team.players.length - 1;
  }

  return index;
};
