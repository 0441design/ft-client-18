// FestivalYearField.jsx
//attrs: festivalId

const m = require("mithril");
//const _ = require('lodash');

import {remoteData} from '../../store/data';

const getFestivalYear = id => {
	const festival = remoteData.Festivals.get(id)
	if(!festival) return ''
	return festival.year
}

const FestivalYearField = {
	oninit: remoteData.Dates.loadList,
	view: ({ attrs }) =>
		<span class="ft-name-field">
			{(getFestivalYear(attrs.festivalId))}
		</span >
};

export default FestivalYearField;