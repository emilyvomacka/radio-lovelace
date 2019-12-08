import React, { Component } from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

class RadioSet extends Component {

  constructor(props) {
    super();

    this.state = {
      morningTracks: props.tracks.slice(0, props.tracks.length / 2),
      eveningTracks: props.tracks.slice(props.tracks.length / 2, props.tracks.length)
    }
  }
  
  updateFavStatus(index, playlist) {
    console.log('Updating fav from RadioSet');

    const newState = {...this.state};
    const playlistTracks = [...newState[playlist]];
    const trackToUpdate = {...playlistTracks[index]};

    trackToUpdate.favorite = !trackToUpdate.favorite;

    playlistTracks[index] = trackToUpdate;
    newState[playlist] = playlistTracks;
    this.setState(newState);
  };

  newTopTrack(index, playlist) {
    const newState = {...this.state};
    const playlistTracks = [...newState[playlist]];
    const track = playlistTracks[index];
    playlistTracks.splice(index, 1);
    playlistTracks.unshift(track);

    newState[playlist] = playlistTracks;
    this.setState(newState);
  }

  render () {
    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={this.state.morningTracks}
            updateFavStatus={index => this.updateFavStatus(index, "morningTracks")}
            newTopTrack={index => this.newTopTrack(index, "morningTracks")}
          />
          <Playlist
            side="Evening"
            tracks={this.state.eveningTracks}
            updateFavStatus={index => this.updateFavStatus(index, "eveningTracks")}
            newTopTrack={index => this.newTopTrack(index, "eveningTracks")}
          />
        </section>
      </div>
    );  
  }
};

export default RadioSet;