export const form = (n) => {
  const FORM = 'FORM'
  
  return {
    type: FORM,
    status: "success",
    payload: n
  }
};
