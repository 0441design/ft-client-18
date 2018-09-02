// StageNameField.jsx
//attrs: stageId

const m = require("mithril");
const _ = require('lodash');

import {remoteData} from '../../store/data';

const getStageName = id => {
	const stage = remoteData.Places.get(id)
	if(!stage) return ''
	return stage.name
}

const StageNameField = {
	oninit: remoteData.Places.loadList,
	view: ({ attrs }) =>
		<div class="ft-name-field">
			{(getStageName(attrs.stageId))}
			
		
		
		</div >
};

export default StageNameField;