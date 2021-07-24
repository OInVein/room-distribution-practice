import React, { useState, useRef } from 'react';
import RoomInfo from './components/RoomInfo';
import { TEST_PEOPLE, TEST_ROOMS, TEST_ROOM_INFOS } from './constants';

import './index.scss';

const App = () => {
  const [people] = useState(TEST_PEOPLE);
  const [rooms] = useState(TEST_ROOMS);
  const roomInfoInstance = useRef(TEST_ROOM_INFOS);

  const handleDistribution = ({ index, action, type, onInputVal, onInputStart }) => {
    const { current: roomInfos } = roomInfoInstance;
    const newRoomInfos = [...roomInfos];
    const { min, max } = rooms[index];
    const adult = 'adult';
    const child = 'child';
    const otherType = (() => {
      switch (type) {
        case adult:
          return child;
        case child:
        default:
          return adult;
      }
    })();
    const otherTypeValue = newRoomInfos[index][otherType];
    const currentTypeValue = newRoomInfos[index][type];
    switch (action) {
      case 'minus': {
        const minusValue = currentTypeValue - 1;
        if (minusValue + otherTypeValue < min || minusValue < min) {
          return false;
        }

        newRoomInfos[index][type] -= 1;
        break;
      }
      case 'plus': {
        const plusValue = currentTypeValue + 1;
        if (plusValue + otherTypeValue > max || plusValue > max) {
          return false;
        }

        newRoomInfos[index][type] += 1;
        break;
      }
      case 'input': {
        if (onInputStart === undefined) {
          const onInputValFormat = Number(onInputVal);
          const expectTotal = onInputValFormat + otherTypeValue;

          if (
            expectTotal > max
            || expectTotal < min
            || onInputValFormat > max
            || onInputValFormat < min
          ) {
            return false;
          }

          newRoomInfos[index][type] = onInputValFormat;
        }
        break;
      }
    }
    return newRoomInfos;
  };

  return (
    <RoomInfo
      people={people}
      rooms={rooms}
      handleDistribution={handleDistribution}
    />
  );
};

export default App;
