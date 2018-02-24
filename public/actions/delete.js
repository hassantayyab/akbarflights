var x = {
    type: 'USER_DELETED',
    payload:[]
}

export const deleteComment = (comments,del) => {
	console.log(del);
    var nComments = comments.filter((comment) => {
      return comment !== del;
    });
    x.payload = nComments;
    console.log('after-delete:',x);
    return x;
};
