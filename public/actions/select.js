export const selectText = (textarea,numb,n,id) => {

var text = textarea;

var sel, range, node;
if (window.getSelection) {
  sel = window.getSelection();
  if (sel.getRangeAt && sel.rangeCount) {
    range = window.getSelection().getRangeAt(0);

    var html = '<div id="circle">'+numb+'</div>'+'<mark>' + range + '</mark>';
    range.deleteContents();
    numb++;
    var el = document.createElement("div");
    el.innerHTML = html;
    var frag = document.createDocumentFragment(), node, lastNode;
    while ( (node = el.firstChild) ) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
  }
} else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.collapse(false);
    range.pasteHTML(html);
  }

  var x = document.getElementById('div').innerHTML;
  //console.log('TEXT:',typeof x, x);
  return {
    type: 'USER_SELECTED',
    ident:id,
    num: n,
    // payload: [],
    numb: numb,
    ans: x
	}
};
