var x = {
    type: 'USER_SUBMITTED',
    num: 3,
    status: "success",
    payload: []
}

var counter = 1;

export const submit = (input, count, num) => {
  if (count!==0) {
    counter = count+1;
  }
  x.payload = counter+ ". " + input;
  counter++;
  x.num = num;
  console.log('IN SUBMIT',x);
  return x;
};
