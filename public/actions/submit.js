export const submit = (comment, comCount, id) => {
  comCount++;
  const x = comCount + '. ' + comment;
  // console.log('x = ', x);
  
  return {
    type: 'USER_SUBMITTED',
    status: 'success',
    id: id,
    comCount: comCount,
    comment: x
  };
};
