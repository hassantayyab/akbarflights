/*
		// obtain the index of the first selected character
		var start = txtarea.selectionStart;
		// obtain the index of the last selected character
		var finish = txtarea.selectionEnd;
		// obtain the selected text
		var sel = txtarea.value.substring(start, finish);
		if (sel=='') {
			return {type:'TR'}
		}
		sel = '[' + counter + ']' + ':(' + sel + ')';
		
		
		counter++;
    var str1 = answer.substring(0,start);
    var str2 = answer.substring(finish);
    var newAnswer = str1+sel+str2;
    //console.log('str:\n',newAnswer);


    */


<textarea  id="mytextarea" readOnly onSelect={() => {this.openModal(); this.handleSelect(event)}} 
				style={{border: '4px solid black',width:'40%',height:'600px',padding: '10px'}} 
				value={this.state.value}></textarea>

    ::selection {
   background: yellow; /* Safari */
   }
::-moz-selection {
   background: yellow; /* Firefox */
}

    <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
				<h1 style={{margin:'12px 12px 12px 12px'}}>Enter Comment</h1>
            	
            	<input style={{width:"80%", padding:"8px 8px 8px 8px",margin:"12px 12px 12px 12px"}} 
            	 type="text" required ref="newItem" autoFocus />
            	<button onClick={() => {this.closeModal(event); this.props.submit(this.refs.newItem.value)}} 
            	style={{margin: '12px 12px 12px 12px'}}>Add Comment</button>
          		
          		</Modal>

    this.props.answer.content

'<div id="circle">'+number+'</div>'


::-moz-selection { 
    background: red;
}
::selection {
    background: red;  
}

this.props.selectText(document.getElementById("mytextarea"),this.props.answer.content)

<Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
				<h1 style={{margin:'12px 12px 12px 12px'}}>Enter Comment</h1>
            	
            	<input style={{width:"80%", padding:"8px 8px 8px 8px",margin:"12px 12px 12px 12px"}} 
            	 type="text" required ref="newItem" autoFocus />
            	<button onClick={() => {this.closeModal(); this.props.submit(this.refs.newItem.value); this.surroundSelection()}} 
            	style={{margin: '12px 12px 12px 12px'}}>Add Comment</button>
          		
          		</Modal>
          		<div style={{float:'right'}}>
          			{this.props.comments}
          		</div>








          		<Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
				<h1 style={{margin:'12px 12px 12px 12px'}}>Enter Comment</h1>
            	
            	<input style={{width:"80%", padding:"8px 8px 8px 8px",margin:"12px 12px 12px 12px"}} 
            	 type="text" required ref="newItem" autoFocus />
            	<button onClick={() => {this.closeModal(event); this.props.submit(this.refs.newItem.value)}} 
            	style={{margin: '12px 12px 12px 12px'}}>Add Comment</button>
          		
          		</Modal>
          		<div style={{float:'right'}}>
          			{this.props.comments}
          		</div>



               handleSelect(event){
      event.preventDefault();
      var txtarea = document.getElementById("mytextarea");
      var text = this.state.value
      var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    // obtain the index of the last selected character

  //  text = text.substr(0,start) + '<mark>' + text.substr(start, finish-start+1) + '</mark>' + text.substr(finish+1)';
  //  document.getElementById("mytextarea").innerHTML = text;
  //  this.setState({value:text})
  //  console.log(text.substr(start, finish-start+1))

    // obtain the selected text
    //  var text = window.getSelection().toString();
    //  console.log(text);
    //  event.target.select();
    //  var mark = document.createElement("mark");
    //  mark.innerHTML = sel;
      var sel = txtarea.value.substring(start, finish);
      var str1 = this.state.value.substring(0,start);
      var str2 = this.state.value.substring(finish);
      sel = sel.replace(sel, '<mark>'+sel+'</mark>');
    //  text = str1 + mark.innerHTML + str2;
      text = str1 + sel + str2;
      this.setState({value:text});
      console.log(sel);
  //    var mark = document.createElement("mark")
//    mark.innerHTML = sel;
  //  mark.className = "highlight";
  //  mark.style.backgroundColor = "yellow";
  //  this.setState({status:true, textSelected:sel,string1:str1, string2:str2})
  //  console.log(mark);
  //  var newState =  document.getElementById("mytextarea").innerHTML = str1 + mark.innerHTML + str2;
    //  this.setState({value:newState});
    }



/*
    // obtain the index of the first selected character
    var start = txtarea.selectionStart;
    // obtain the index of the last selected character
    var finish = txtarea.selectionEnd;
    // obtain the selected text
    var sel = txtarea.value.substring(start, finish);
    if (sel=='') {
      return {type:'TR'}
    }
  //  sel = '[' + counter + ']' + ':(' + sel + ')';
  //  var mark = document.createElement("mark")
  //  mark.innerHTML = sel;
  //  span.className = "highlight";
  //  span.style.backgroundColor = "yellow";
  //  document.getElementById("mytextarea").appendChild(mark);  
    
  //  counter++;
    var str1 = answer.substring(0,start);
    var str2 = answer.substring(finish);
    var newAnswer = str1+"<mark>"+sel+"</mark>"+str2;
  //  console.log(mark.innerHTML)
  //  console.log(newAnswer)
    //console.log('str:\n',newAnswer);
    
*/
//  var newAnswer = document.getElementById("mytextarea");

  var myTextArea = document.getElementById('mytextarea');
    var myTextAreaValue = myTextArea.value;
    var start = mytextarea.selectionStart;
    var finish = mytextarea.selectionEnd;
    var sel = mytextarea.value.substring(start, finish);
    var str1 = answer.substring(0,start);
    var str2 = answer.substring(finish);
    var updatedText = str1 + '<mark>' + sel + '</mark>' + str2;
    myTextArea.value = updatedText;

/*
    var sel = window.getSelection();
  
  var text = txtarea.innerHTML;
  answer = text.replace(sel, '<mark>'+sel+'</mark>');

*/