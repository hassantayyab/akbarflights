export const fetch = (data) => {
  const FETCH = 'FETCH'

  return {
    type: FETCH,
    status: "success",
    username: data[0],
    passord: data[1],
    multiplier: data[2]
  }
};