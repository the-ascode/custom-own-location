import React from 'react';
import CreateMaps from './CreateMaps';
import { connect } from "react-redux";
import { updateMapFormFields } from '../../store/actions';

class EditMap extends React.Component {

  componentDidMount() {
    let id = this.props.match.params.id;
    let data = {
      'action': 'col_edit_maps_action',
      'id': id
    };

    jQuery.post(ajaxurl, data, (response) => {
      let mapsInfo = response.data;
      console.log(mapsInfo.marker.type);

      this.props.updateMapFormFields({
        mapName: mapsInfo.title,
        height: mapsInfo.height,
        width: mapsInfo.width,
        markerPosition: {
          lat: parseFloat(mapsInfo.position.lat),
          lng: parseFloat(mapsInfo.position.lng)
        },
        mapPosition: {
          lat: parseFloat(mapsInfo.position.lat),
          lng: parseFloat(mapsInfo.position.lng)
        },    
        markerIcon: {
          type: mapsInfo.marker.type,
          color: mapsInfo.marker.color,
        }
      });

    });
  } 

  render() {
    return (
      <div>
        <CreateMaps />
      </div>
    )
  }
}

const mapStateToProps = state => ( {
  mapForm: state.mapForm
} );

export default connect(
  mapStateToProps,
  { updateMapFormFields }
)(EditMap);
