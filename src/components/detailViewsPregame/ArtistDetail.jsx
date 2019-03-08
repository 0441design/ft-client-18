// ArtistDetail.jsx


import m from 'mithril'
import _ from 'lodash'

import LauncherBanner from '../ui/LauncherBanner.jsx';
import CardContainer from '../../components/layout/CardContainer.jsx';
import FestivalCard from '../../components/cards/FestivalCard.jsx';
import ArtistReviewCard from '../../components/cards/ArtistReviewCard.jsx';
import DateCard from '../../components/cards/DateCard.jsx';
import NavCard from '../../components/cards/NavCard.jsx';
import ReviewCard from '../../components/cards/ReviewCard.jsx';
import SpotifyCard from '../../components/cards/SpotifyCard.jsx';

import WidgetContainer from '../../components/layout/WidgetContainer.jsx';
import FixedCardWidget from '../../components/widgets/FixedCard.jsx';
import DiscussionWidget from '../../components/widgets/canned/DiscussionWidget.jsx';
import AdminWidget from '../../components/widgets/Admin.jsx';

import CloudImageField from '../../components/fields/CloudImageField.jsx';

import DiscussModal from '../modals/DiscussModal.jsx';

import {remoteData} from '../../store/data';

// Services
import Auth from '../../services/auth.js';
const auth = new Auth();

const ArtistDetail = (vnode) => { 
	var artistId = 0
	var artist = undefined
	var messages = []
	var discussing = false
	var subjectObject = {}
	var messageArray = []
	var userId = 0
	return {
		oninit: () => {
			artistId = parseInt(m.route.param('id'), 10)
			artist = artistId ? remoteData.Artists.get(artistId) : undefined
			messages = remoteData.Messages.forArtist(artistId)
			userId = auth.userId()
			remoteData.Messages.loadForArtist(parseInt(m.route.param('id'), 10))
	
		},
		onbeforeupdate: () => {
			artist = artistId ? remoteData.Artists.get(artistId) : undefined
			messages = remoteData.Messages.forArtist(artistId)
			//console.log('ArtistDetail update')
		},
		view: () => <div class="main-stage">
			<LauncherBanner 
				title={artist ? artist.name : ''} 
			
			/>
			
			<WidgetContainer>
				<FixedCardWidget >
					<CloudImageField subjectType={2} subject={artistId} sources={['url']} />
				</FixedCardWidget>
				{artist ? <FixedCardWidget header="Listen & Review" >
					<SpotifyCard fieldValue={artist.name} />
					<ReviewCard type="artist" data={artist} />
				</FixedCardWidget> : ''}
				<AdminWidget header="Artist Admin">
					<NavCard fieldValue="Fix Artist Names" action={() => m.route.set("/artists/pregame/fix/" + artistId)}/>
				</AdminWidget>
				<FixedCardWidget header="Festival Lineups">
					{
						remoteData.Lineups.festivalsForArtist(artistId)
							.sort((a, b) => b - a)
							.map(f => <FestivalCard eventId={f} artistId={artistId} />)
					}
				</FixedCardWidget>
				{
					//find each message about this artist and order by user
					_.map(remoteData.Messages.forArtistReviewCard(artistId),
						me => <DiscussionWidget 
							messageArray={me} 
							discussSubject={(s, me) => {
								subjectObject = _.clone(s)
								messageArray = _.clone(me)
								//console.log('ArtistDetail ArtistReviewCard discussSubject me length ' + me.length)
								discussing = true
							}}
						/>
					)
				}
			</WidgetContainer>
			{messageArray.length && userId ? <DiscussModal
				display={discussing} 
				hide={sub => {discussing = false;}}
				subject={subjectObject}
				messageArray={messageArray}
				reviewer={messageArray[0].fromuser}
				user={userId}
			/> : ''}
		</div>
}}
export default ArtistDetail;
