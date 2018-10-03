// ArtistEntryModal.jsx


const m = require("mithril");
const _ = require("lodash");

// change selections
import UIButton from '../../../components/ui/UIButton.jsx';
import {remoteData} from '../../../store/data';

const classes = attrs => 'modal ' + (attrs.display ? '' : 'hidden')
var textValue = ''
var selectedId = 0
const ArtistEntryModal = {
	view: ({attrs}) => <div class={classes(attrs)}>
        <div class="modal-content">
            <ArtistSelector 
                label="Select an existing artist:"
                defaultText="Select an artist"
                artistChange={e => selectedId = e.target.value}
            />
            
            <label for="new-artist">Or add a new artist</label>
            <input name="new-artist" type="text" onchange={e => textValue = e.target.value}/>
            <UIButton action={e => {
                attrs.hide()

            }} buttonName="Cancel" />
            <UIButton action={e => {
                //console.log('ArtistEntryModal')
                //console.log(textValue)
                //console.log(selectedId)
                //if there is a selected id, return it
                //if not, create the artist, then return that id
                if(selectedId || !textValue.length) {
                    attrs.hide()
                    attrs.action(Promise.resolve(remoteData.Artists.get(selectedId)))
                }
                //make sure the name is not in thr list
                const matchedArtist = _.find(remoteData.Artists.list, a => _.toLower(a.name) === _.toLower(textValue))
                if(matchedArtist && matchedArtist.id) {
                    attrs.hide()
                    attrs.action(Promise.resolve(matchedArtist))
                }

                attrs.action(remoteData.Lineups.addArtist({name: textValue}, attrs.festivalId)
                    .then(result => {attrs.hide();return result;}))
                    .then(result => {m.redraw(); return result})

                //
            }} buttonName="Accept" />
        </div>
    </div>
};

export default ArtistEntryModal;