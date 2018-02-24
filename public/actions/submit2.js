var x = {
    type: 'USER_SUBMITTED',
    id: 1,
    num: 2,
    status: "success",
    payload: []
}

var counter = 1;

export const submit = (input, count, num,id) => {
  if (count!==0) {
    counter = count+1;
  }
  x.id = id;
  x.payload = counter+ ". " + input;
  counter++;
  x.num = num;
  console.log('IN SUBMIT',x);
  return x;
};
