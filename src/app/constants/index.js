const TEST_PEOPLE = (() => {
  const testPeole = 5;
  console.log(`TEST_PEOPLE: ${testPeole}`);
  return testPeole;
})();
const TEST_ROOMS = (() => {
  const testRooms = [{ min: 0, max: 2 }, { min: 1, max: 3 }];
  console.log(`TEST_ROOMS: ${JSON.stringify(testRooms)}`);
  return testRooms;
})();
const TEST_ROOM_INFOS = (() => {
  const testRoomInfos = [{ adult: 0, child: 2 }, { adult: 0, child: 2 }];
  console.log(`TEST_ROOM_INFOS: ${JSON.stringify(testRoomInfos)}`);
  return testRoomInfos;
})();

export { TEST_PEOPLE, TEST_ROOMS, TEST_ROOM_INFOS };
