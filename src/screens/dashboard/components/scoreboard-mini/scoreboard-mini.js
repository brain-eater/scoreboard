import {Card} from 'react-native-elements';
import React from 'react';
import ScoreboardMiniRow from './scoreboard-mini-row';

const ScoreboardMini = ({team1, team2, overs, battingTeam}) => {
  return (
    <Card>
      <ScoreboardMiniRow
        team={team1}
        overs={overs}
        isBatting={battingTeam === 'team1'}
      />
      <ScoreboardMiniRow
        team={team2}
        overs={overs}
        isBatting={battingTeam === 'team2'}
      />
    </Card>
  );
};

export default ScoreboardMini;
