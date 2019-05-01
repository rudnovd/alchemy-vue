export function ifGameIdUniq (gameId, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].gameId === gameId) {
      return false
    }
  }
  return true
}
