// SearchCard.jsx

import m from 'mithril'

import  ComposedNameField from '../fields/ComposedNameField.jsx';

const SearchCard = {
  view: ({ attrs }) =>
    <div class="ft-card">
    	<label class="hidden" for="artist-search-input">Search for artist</label>
      	<input type="text" oninput={attrs.patternChange} name="artist-search-input" />
    </div>
};

export default SearchCard;