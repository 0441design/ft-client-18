// DaySelector.jsx
import m from 'mithril'
import _ from 'lodash'

import {remoteData} from '../../../../store/data'

const DaySelector = {
	oninit: () => {
		remoteData.Dates.loadList()
		remoteData.Days.loadList()
	},
	view: ({ attrs }) =>
		<div class="ft-name-field">
			<label for="day">
		        {`Festival Day`}
		    </label>
			    <select id="ft-day-selector" name="day" class={attrs.dateId ? '' : 'hidden'} onchange={attrs.dayChange}>
			    	<option value={0} selected={ attrs.dayId ? '' : "selected"}>{`Select a day`}</option>
		      		{_.flow(
		      			remoteData.Dates.getSubIds,
		      			remoteData.Days.getMany
		      		)(attrs.dateId)
		      			.sort((a, b) => a.daysOffset - b.daysOffset)
			      		.map(s => <option value={s.id}>{s.name}</option>)
			      	}
		    </select>
		</div>
};

export default DaySelector;