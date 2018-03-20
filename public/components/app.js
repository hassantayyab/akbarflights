import React from 'react';
import AnswerBox from '../containers/container-answerbox';
import Title from '../containers/container-title';
import AnswerDescription from '../containers/container-answerDescription';
import CommentDescription from '../containers/container-commentDescription';
import CommentBox from '../containers/container-commentBox';


const layout = () => (
	<div>
		<Title />
		{/* <AnswerDescription /> */}
		<AnswerBox />
	</div>
);

export default layout;
