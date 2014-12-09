var React = require('react'),
    CurrentSong = require('./CurrentSong'),
    PlayerBar = require('./PlayerBar'),
    PlayerTrack = require('./PlayerTrack'),
    SC = require('./SoundCloud'),
    Q = require('../vendor/q'),
    songs = require('../data/songs'),
    Player;

Player = React.createClass({
    getInitialState: function() {
        return {
            playing: false,
            currentSong: {
            },
            currentArtwork: '',
            currentTitle: 'No songs loaded',
            current: -1,
            length: 0
        };
    },
    _onBackwardClick: function() {
        this.prev();
    },
    _onForwardClick: function() {
        this.next();
    },
    _onPlayPauseClick: function() {
        this.togglePlayPause();
    },
    togglePlayPause: function() {
        if(this.state.playing) {
            this.pause();
        } else {
            this.play();
        }
    },
    addEventListeners: function() {
        window.addEventListener('keydown', function(e) {
            switch(e.keyCode) {
                case 32:
                    this.togglePlayPause();
                    break;
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
            }
        }.bind(this));
    },
    componentDidMount: function() {
        this.setState({
            songs: songs
        });

        this.addEventListeners();

        this.next();
    },
    next: function() {
        if(this.state.length - this.state.current) {
            SC.getTrack(
                this.state.songs[this.state.current + 1]
            ).then(function(data) {
                var wasPlaying = this.state.playing;

                this.pause();

                this.setState({
                    currentSong: data,
                    current: this.state.current + 1,
                    wasPlaying: this.state.playing,
                    currentArtworkURL: data.track.artwork_url,
                    currentTitle: data.track.title
                });

                wasPlaying && this.play();
            }.bind(this));
        }
    },
    prev: function() {
        if(this.state.current) {
            SC.getTrack(songs[this.state.current - 1]).then(function(data) {
                var wasPlaying = this.state.playing;

                this.pause();

                this.setState({
                    currentSong: data,
                    current: this.state.current - 1
                });

                wasPlaying && this.play();
            }.bind(this));
        }
    },
    play: function() {
        if(this.state.currentSong.stream) {
            this.state.currentSong.stream.play();
            this.setState({
                playing: true
            });
        }
    },
    pause: function() {
        if(this.state.currentSong.stream) {
            this.state.currentSong.stream.pause();
        }

        this.setState({
            playing: false
        });
    },
    render: function() {
        return (
            <div>
                <CurrentSong
                    artworkURL={this.state.currentArtworkURL}
                    title={this.state.currentTitle}
                    />
                <PlayerBar
                    onBackwardClick={this._onBackwardClick}
                    onForwardClick={this._onForwardClick}
                    onPlayPauseClick={this._onPlayPauseClick}
                    playing={this.state.playing}
                    />
            </div>
        );
    }
});

module.exports = Player;
