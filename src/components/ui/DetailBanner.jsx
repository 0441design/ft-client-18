// DetailBanner.jsx

const m = require('mithril');

import DetailTitle from './DetailTitle.jsx';
import LogoutButton from './LogoutButton.jsx';

import BannerButton from '../ui/BannerButton.jsx';
import FilterButton from '../ui/FilterButton.jsx';
import SortButton from '../ui/SortButton.jsx';

const DetailBanner = {
	view: ({ attrs }) =>
		<div class="stage-banner">
			<DetailTitle title={attrs.title} />
			<LogoutButton action={attrs.action} />
		</div>
};

export default DetailBanner;