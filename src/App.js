/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQCdwbyz54YB2awFWZRSslSjE9eEsaNCawS_ylu-kMHxoqifzChi9YRgbYptJiIdxuwec0tCoIhOrmOtoF8iEoVMmR56gi_16V_1MvKap6F0HSeHdgQzR4H-IgW08IDSR3-PF02gDV_bTGoH659Nkw';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      tracks: null,
      songsLoaded: false,
      currentTrack: null
    };
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        tracks: data.items,
        songsLoaded: true,
        currentTrack: data.items[0]
      });
    })
  }

  render() {
    if (!this.state.songsLoaded){
      return (
        <div className="App">
          <img src={loading} alt="Chargement en cours"/>
        </div>
      );
  }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <AlbumCover track={this.state.currentTrack}/>
            <p>Nous avons chargé {this.state.tracks.length} chansons.</p>
            <p>Titre de la première chanson : {this.state.tracks[0].track.name}.</p>
          </div>
          <div className="App-buttons">
          </div>
        </div>
      );
    }

  }

}

class AlbumCover extends Component {
  render() {
    const src = "https://example.com/image.png";
    return (<img src={src} style={{ width: 400, height: 400 }} />);
  }
}

export default App;
