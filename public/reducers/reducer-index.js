import {combineReducers} from 'redux';
import AnswerReducer from './reducer-answer';
import AnswerReducer2 from './reducer-answer2';
import AnswerReducer3 from './reducer-answer3';
import AnswerReducer4 from './reducer-answer4';
import TitleReducer from './reducer-title';
import AnswerDescriptionReducer from './reducer-answerDescription';
import CommentDescriptionreducer from './reducer-commentDescription';
import CommentBox from './reducer-commentbox';
import CommentBox2 from './reducer-commentbox2';
import CommentBox3 from './reducer-commentbox3';
import CommentBox4 from './reducer-commentbox4';
import {routerReducer} from 'react-router-redux';


const allReducers = combineReducers({
	answer: AnswerReducer,
	answer2: AnswerReducer2,
	answer3: AnswerReducer3,
	answer4: AnswerReducer4,
	title: TitleReducer,
	answerDescription: AnswerDescriptionReducer,
	commentDescription : CommentDescriptionreducer,
	CommentBox: CommentBox,
	CommentBox2: CommentBox2,
	CommentBox3: CommentBox3,
	CommentBox4: CommentBox4,
	routing: routerReducer
})


export default allReducers;
