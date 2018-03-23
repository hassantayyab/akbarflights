export const selectText = (textarea, hiLiCount, id) => {

  var text = textarea;

  var sel, range, node;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = window.getSelection().getRangeAt(0);

      var html = '<div id="circle">' + hiLiCount + '</div>' + '<mark>' + range + '</mark>';
      range.deleteContents();
      hiLiCount++;
      var el = document.createElement('div');
      el.innerHTML = html;
      var frag = document.createDocumentFragment(), node, lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.collapse(false);
    range.pasteHTML(html);
  }

  var x = document.getElementById('answer').innerHTML;
  // console.log('hiLiCount in select:', hiLiCount);
  return {
    type: 'USER_SELECTED',
    id, hiLiCount,
    answer: x
  }
};
