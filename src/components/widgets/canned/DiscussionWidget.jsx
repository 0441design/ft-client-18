// DiscussionWidget.jsx

//given a list of bands to research, this widget 
//filters out unneded ones, sorts the rest and displays artist cards



import m from 'mithril'
import _ from 'lodash'

// Services
import {buildTree, mapActivities, baseMessage} from '../../../services/messageArrayFunctions.js';
import Auth from '../../../services/auth.js';
const auth = new Auth();

import SubjectReviewCard from '../../../components/cards/SubjectReviewCard.jsx';
import {subjectCard} from '../../../components/cards/subjectCard.js';
import ActivityCard from '../../../components/cards/ActivityCard.jsx';
import LargeCardWidget from '../LargeCardWidget.jsx';
import  DiscussModal from '../../modals/DiscussModal.jsx';
import {remoteData, subjectData} from '../../../store/data';



const DiscussionWidget = vnode => {
	var userId = 0
	const routeId = _.flow(m.route.param, parseInt)('id')
	var reviewing = false
	var discussing = false
	var subjectObject = {}
	var removed = []
	let messageArray = []
	let pattern;
	const patternChange = e => {
		pattern = e.target.value
		//console.log('ArtistSearchWidget pattern ' + pattern)
	}   
	const loadSubjectObject = s => subjectObject = _.clone(s)
	const loadMessageArray = me => messageArray = _.clone(me)
	const startDiscussing = () => discussing = true
					
					
	return {
		oninit: () => {
			auth.getFtUserId()
				.then(id => userId = id)
				.then(() => {})
				.then(m.redraw)
				.catch(err => m.route.set('/auth'))
		},
		view: ({attrs}) => <LargeCardWidget 
				header="Discuss"
				headerCard = {attrs.headerCard && attrs.messageArray.length ? 
					subjectCard(attrs.messageArray[0]) : 
				''}
			>
			{!attrs.supressModal && messageArray.length ? <DiscussModal
				display={discussing} 
				hide={sub => {discussing = false;}}
				subject={subjectObject}
				messageArray={messageArray}
				reviewer={messageArray[0].fromuser}
				user={userId}
			/> : ''}
			{
				//first card is subjectMessage SubjectReviewCard
				<SubjectReviewCard 
					messageArray={attrs.messageArray} 
					reviewer={attrs.messageArray[0].fromuser}
					overlay={'discuss'}
					discussSubject={attrs.discussSubject}
					userId={userId}
				/>
			}
			{

					mapActivities(attrs.discussSubject, remoteData.Messages.get, ActivityCard)(
					buildTree(attrs.messageArray, remoteData.Messages.discussionOf(baseMessage(attrs.messageArray).id))
					)
				//map the tree to activity cards with left-spacers (1 space for each depth of tree)

			}
			</LargeCardWidget>	
}};

export default DiscussionWidget;