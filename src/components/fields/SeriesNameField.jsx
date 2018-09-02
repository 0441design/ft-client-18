// SeriesNameField.jsx
//attrs: seriesId

const m = require("mithril");
//const _ = require('lodash');

import {remoteData} from '../../store/data';

const getSeriesName = id => {
	const series = remoteData.Series.get(id)
	if(!series) return ''
	return series.name
}

const SeriesNameField = {
	oninit: remoteData.Series.loadList,
	view: ({ attrs }) =>
		<div class="ft-name-field">
			{(getSeriesName(attrs.seriesId))}
			
		
		
		</div >
};

export default SeriesNameField;