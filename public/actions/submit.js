export const submit = (flightsFrm, flightsTo, frm, to) => {
  const SUBMIT = 'SUBMIT'
  var status = 'empty';
  if (flightsFrm==null && flightsTo==null) {
    status = 'loading'
  }
  else if (flightsFrm == null) {
    status = 'one'
  }
  else {
    status = 'two'
  }
  // console.log('in submit');
  return {
    type: SUBMIT,
    status,
    payloadf: flightsFrm,
    payloadt: flightsTo,
    frm,
    to
  }
};
