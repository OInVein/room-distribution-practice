import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TEST_ROOM_INFOS } from '../../constants';

import './index.scss';

const reMappingSimulated = mappingData => mappingData.map(el => ({
  ...el,
  isKeyUpAdult: false,
  isKeyUpChild: false,
}));

const RoomInfo = ({ people, rooms, handleDistribution }) => {
  const RE_SIMULATITED = reMappingSimulated(TEST_ROOM_INFOS);
  const [roomInfos, setRoomInfos] = useState(RE_SIMULATITED);

  const renderRooms = roomInfos.map(({
    adult: adultValue = 0,
    child: childValue = 0,
    isKeyUpAdult = false,
    isKeyUpChild = false,
  }, index) => {
    const { max, min } = rooms[index];

    const handleClick = ({ action, type, onInputVal = 0, onInputStart }) => {
      const result = handleDistribution({ index, action, type, onInputVal, onInputStart });
      if (!result) {
        return;
      }

      const newResult = reMappingSimulated(result);

      const keyUpType = `${type.substr(0, 1).toUpperCase()}${type.slice(1)}`;
      newResult[index][`isKeyUp${keyUpType}`] = (() => {
        return onInputStart !== undefined ? onInputStart : true;
      })();

      setRoomInfos(newResult);
    };

    const total = adultValue + childValue;

    return (
      <div key={`roomInfo__${index}`} className="container__roomInfo">
        <div className="container__roomInfo__title">
          房間：<span>{total}人</span>
        </div>
        <div className="container__roomInfo__counterContainer">
          <div className="passengerInfo">
            <div>大人</div>
            <div className="passengerInfo__age">年齡 20+</div>
          </div>
          <div className="counter">
            {(() => {
              const isMinusDisabled = adultValue - 1 + childValue < min || adultValue - 1 < min;
              const isPlusDisabled = adultValue + 1 + childValue > max || adultValue + 1 > max;
              return (
                <>
                  <div
                    {...(() => {
                      const className = `counterMinus ${isMinusDisabled ? 'counterButtonDisabled' : ''}`;
                      const onClick = () => {
                        if (isMinusDisabled) {
                          return;
                        }

                        handleClick({ action: 'minus', type: 'adult' });
                      }
                      return { className, onClick };
                    })()}
                  />
                  <div className={`counterValue ${isKeyUpAdult ? 'focus' : ''}`}>
                    <input
                      name="adultNumber"
                      className={`${isKeyUpAdult ? 'focusFont' : ''}`}
                      type={isKeyUpAdult ? 'number' : 'text'}
                      value={adultValue}
                      min={min}
                      max={max}
                      step={1}
                      onFocus={(e) => {
                        handleClick({ action: 'input', type: 'adult', onInputVal: e.target.value });
                      }}
                      onClick={() => {
                        handleClick({ action: 'input', type: 'adult', onInputStart: true });
                      }}
                      onChange={(e) => {
                        handleClick({ action: 'input', type: 'adult', onInputVal: e.target.value });
                      }}
                      onBlur={() => {
                        handleClick({ action: 'input', type: 'adult', onInputStart: false });
                      }}
                    />
                  </div>
                  <div
                    {...(() => {
                      const className = `counterPlus ${isPlusDisabled ? 'counterButtonDisabled' : ''}`;
                      const onClick = () => {
                        if (isPlusDisabled) {
                          return;
                        }

                        handleClick({ action: 'plus', type: 'adult' });
                      }
                      return { className, onClick };
                    })()}
                  />
                </>
              );
            })()}
          </div>
        </div>
        <div className="container__roomInfo__counterContainer">
          <div className="passengerInfo">
            <div>小孩</div>
            <div className="passengerInfo__age">年齡 0+</div>
          </div>
          <div className="counter">
            {(() => {
              const isMinusDisabled = childValue - 1 + adultValue < min || childValue - 1 < min;
              const isPlusDisabled = childValue + 1 + adultValue > max || childValue + 1 > max;
              return (
                <>
                  <div
                    {...(() => {
                      const className = `counterMinus ${isMinusDisabled ? 'counterButtonDisabled' : ''}`;
                      const onClick = () => {
                        if (isMinusDisabled) {
                          return;
                        }

                        handleClick({ action: 'minus', type: 'child' });
                      }
                      return { className, onClick };
                    })()}
                  />
                  <div className={`counterValue ${isKeyUpChild ? 'focus' : ''}`}>
                    <input
                      name="childNumber"
                      className={`${isKeyUpChild ? 'focusFont' : ''}`}
                      type={isKeyUpChild ? 'number' : 'text'}
                      value={childValue}
                      min={min}
                      max={max}
                      step={1}
                      onFocus={(e) => {
                        handleClick({ action: 'input', type: 'child', onInputVal: e.target.value });
                      }}
                      onClick={() => {
                        handleClick({ action: 'input', type: 'child', onInputStart: true });
                      }}
                      onChange={(e) => {
                        handleClick({ action: 'input', type: 'child', onInputVal: e.target.value });
                      }}
                      onBlur={() => {
                        handleClick({ action: 'input', type: 'child', onInputStart: false });
                      }}
                    />
                  </div>
                  <div
                    {...(() => {
                      const className = `counterPlus ${isPlusDisabled ? 'counterButtonDisabled' : ''}`;
                      const onClick = () => {
                        if (isPlusDisabled) {
                          return;
                        }

                        handleClick({ action: 'plus', type: 'child' });
                      }
                      return { className, onClick };
                    })()}
                  />
                </>
              );
            })()}
          </div>
        </div>
        {roomInfos.length > 1 && index !== roomInfos.length - 1 && <div className="container__roomInfo__divider" />}
      </div>
    );
  });

  return (
    <div className="container">
      <div className="container__title">
        住客人數：
        <span>
          {people}人/{rooms.length}房
        </span>
      </div>
      <div className="container__roomInfoContainer">
        {renderRooms}
      </div>
    </div>
  );
};

RoomInfo.propTypes = {
  people: PropTypes.number.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
  ),
  handleDistribution: PropTypes.func.isRequired,
};

export default RoomInfo;
