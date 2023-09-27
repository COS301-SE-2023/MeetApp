

const randomNumbers = []
for (let i = 1; i <= 9; i++) {
    randomNumbers.push(Math.random() + (i * 0.0001));
    }
      
// Calculate the sum of the random numbers
const sum = randomNumbers.reduce((acc, curr) => acc + curr, 0);
      
// Normalize the random numbers so that their sum equals 1
const normalizedNumbers = randomNumbers.map((num) => num / sum).sort().reverse();

 
    
export const groupDuration = [{parameter : 'duration', value : normalizedNumbers[0], rank: 1}, {parameter : 'category', value : normalizedNumbers[1], rank: 2}, {parameter : 'region', value : normalizedNumbers[2], rank: 3},
{parameter : 'location-range', value : normalizedNumbers[3], rank: 4}, {parameter : 'organisation', value : normalizedNumbers[4], rank: 5}, {parameter : 'interest', value : normalizedNumbers[5], rank: 6},
{parameter : 'chat-room', value : normalizedNumbers[6], rank: 7}, {parameter : 'day', value : normalizedNumbers[7], rank: 8}, {parameter : 'friend-influence', value : normalizedNumbers[8], rank: 9}, {parameter : 'popularity', value : normalizedNumbers[9], rank: 10}]

export const groupChatRoom = [{parameter : 'duration', value : normalizedNumbers[1], rank: 2}, {parameter : 'category', value : normalizedNumbers[2], rank: 3}, {parameter : 'region', value : normalizedNumbers[3], rank: 4},
{parameter : 'location-range', value : normalizedNumbers[4], rank: 5}, {parameter : 'organisation', value : normalizedNumbers[5], rank: 6}, {parameter : 'interest', value : normalizedNumbers[6], rank: 7},
{parameter : 'chat-room', value : normalizedNumbers[0], rank: 1}, {parameter : 'day', value : normalizedNumbers[9], rank: 10}, {parameter : 'friend-influence', value : normalizedNumbers[7], rank: 8}, {parameter : 'popularity', value : normalizedNumbers[8], rank: 9}]

export const groupCategory = [{parameter : 'duration', value : normalizedNumbers[2], rank: 3}, {parameter : 'category', value : normalizedNumbers[0], rank: 1}, {parameter : 'region', value : normalizedNumbers[1], rank: 2},
{parameter : 'location-range', value : normalizedNumbers[5], rank: 6}, {parameter : 'organisation', value : normalizedNumbers[8], rank: 9}, {parameter : 'interest', value : normalizedNumbers[4], rank: 5},
{parameter : 'chat-room', value : normalizedNumbers[9], rank: 10}, {parameter : 'day', value : normalizedNumbers[3], rank: 4}, {parameter : 'friend-influence', value : normalizedNumbers[6], rank: 7}, {parameter : 'popularity', value : normalizedNumbers[7], rank: 8}]

export const groupDay = [{parameter : 'duration', value : normalizedNumbers[4], rank: 5}, {parameter : 'category', value : normalizedNumbers[3], rank: 4}, {parameter : 'region', value : normalizedNumbers[5], rank: 6},
{parameter : 'location-range', value : normalizedNumbers[7], rank: 8}, {parameter : 'organisation', value : normalizedNumbers[6], rank: 7}, {parameter : 'interest', value : normalizedNumbers[9], rank: 10},
{parameter : 'chat-room', value : normalizedNumbers[8], rank: 9}, {parameter : 'day', value : normalizedNumbers[0], rank: 1}, {parameter : 'friend-influence', value : normalizedNumbers[2], rank: 3}, {parameter : 'popularity', value : normalizedNumbers[1], rank: 2}]

export const groupRegion = [{parameter : 'duration', value : normalizedNumbers[3], rank: 4}, {parameter : 'category', value : normalizedNumbers[4], rank: 5}, {parameter : 'region', value : normalizedNumbers[0], rank: 1},
{parameter : 'location-range', value : normalizedNumbers[1], rank: 2}, {parameter : 'organisation', value : normalizedNumbers[9], rank: 10}, {parameter : 'interest', value : normalizedNumbers[2], rank: 3},
{parameter : 'chat-room', value : normalizedNumbers[7], rank: 8}, {parameter : 'day', value : normalizedNumbers[8], rank: 9}, {parameter : 'friend-influence', value : normalizedNumbers[5], rank: 6}, {parameter : 'popularity', value : normalizedNumbers[6], rank: 7}]

export const groupInterest = [{parameter : 'duration', value : normalizedNumbers[8], rank: 9}, {parameter : 'category', value : normalizedNumbers[6], rank: 7}, {parameter : 'region', value : normalizedNumbers[7], rank: 8},
{parameter : 'location-range', value : normalizedNumbers[2], rank: 3}, {parameter : 'organisation', value : normalizedNumbers[1], rank: 2}, {parameter : 'interest', value : normalizedNumbers[0], rank: 1},
{parameter : 'chat-room', value : normalizedNumbers[3], rank: 4}, {parameter : 'day', value : normalizedNumbers[4], rank: 5}, {parameter : 'friend-influence', value : normalizedNumbers[9], rank: 10}, {parameter : 'popularity', value : normalizedNumbers[5], rank: 6}]

export const groupOrganisation = [{parameter : 'duration', value : normalizedNumbers[6], rank: 7}, {parameter : 'category', value : normalizedNumbers[5], rank: 6}, {parameter : 'region', value : normalizedNumbers[8], rank: 9},
{parameter : 'location-range', value : normalizedNumbers[9], rank: 10}, {parameter : 'organisation', value : normalizedNumbers[0], rank: 1}, {parameter : 'interest', value : normalizedNumbers[3], rank: 4},
{parameter : 'chat-room', value : normalizedNumbers[4], rank: 5}, {parameter : 'day', value : normalizedNumbers[2], rank: 3}, {parameter : 'friend-influence', value : normalizedNumbers[1], rank: 2}, {parameter : 'popularity', value : normalizedNumbers[7], rank: 8}]

export const groupPopularity = [{parameter : 'duration', value : normalizedNumbers[7], rank: 8}, {parameter : 'category', value : normalizedNumbers[9], rank: 10}, {parameter : 'region', value : normalizedNumbers[8], rank: 9},
{parameter : 'location-range', value : normalizedNumbers[6], rank: 7}, {parameter : 'organisation', value : normalizedNumbers[2], rank: 3}, {parameter : 'interest', value : normalizedNumbers[5], rank: 6},
{parameter : 'chat-room', value : normalizedNumbers[1], rank: 2}, {parameter : 'day', value : normalizedNumbers[4], rank: 5}, {parameter : 'friend-influence', value : normalizedNumbers[3], rank: 4}, {parameter : 'popularity', value : normalizedNumbers[0], rank: 1}]

export const groupFriendInfluence = [{parameter : 'duration', value : normalizedNumbers[5], rank: 6}, {parameter : 'category', value : normalizedNumbers[9], rank: 10}, {parameter : 'region', value : normalizedNumbers[6], rank: 7},
{parameter : 'location-range', value : normalizedNumbers[8], rank: 9}, {parameter : 'organisation', value : normalizedNumbers[1], rank: 2}, {parameter : 'interest', value : normalizedNumbers[7], rank: 8},
{parameter : 'chat-room', value : normalizedNumbers[2], rank: 3}, {parameter : 'day', value : normalizedNumbers[4], rank: 5}, {parameter : 'friend-influence', value : normalizedNumbers[0], rank: 1}, {parameter : 'popularity', value : normalizedNumbers[3], rank: 4}]

export const groupLocationRange = [{parameter : 'duration', value : normalizedNumbers[9], rank: 10}, {parameter : 'category', value : normalizedNumbers[8], rank: 9}, {parameter : 'region', value : normalizedNumbers[5], rank: 4},
{parameter : 'location-range', value : normalizedNumbers[0], rank: 1}, {parameter : 'organisation', value : normalizedNumbers[7], rank: 8}, {parameter : 'interest', value : normalizedNumbers[3], rank: 2},
{parameter : 'chat-room', value : normalizedNumbers[4], rank: 5}, {parameter : 'day', value : normalizedNumbers[6], rank: 7}, {parameter : 'friend-influence', value : normalizedNumbers[1], rank: 2}, {parameter : 'popularity', value : normalizedNumbers[2], rank: 3}]

export const WeightGroups: { [key: string]: {parameter : string, value : number, rank : number}[] } = {
    'LocationRange': groupLocationRange,
    'FriendInfluence': groupFriendInfluence,
    'Duration': groupDuration,
    'Region': groupRegion,
    'Category': groupCategory,
    'Interest': groupInterest,
    'Organisation': groupOrganisation,
    'Popularity': groupPopularity,
    'ChatRoom': groupChatRoom,
    'Day' : groupDay
  };