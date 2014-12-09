var React = require('react');
var CurrentSong = require('./CurrentSong');
var PlayerBar = require('./PlayerBar');
var SC = require('./SoundCloud');
var songs = require('../data/songs');
var Q = require('../vendor/q');

var Player = React.createClass({
    getInitialState: function() {
        return {
            playing: false,
            currentSong: null,
            current: -1,
            length: songs.length
        };
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
    componentDidMount: function() {
        this.setState({
            songs: songs
        });

        this.addEventListeners();

        this.next();
    },
    next: function() {
        if(this.state.length - this.state.current) {
            SC.getTrack(songs[this.state.current + 1]).then(function(data) {
                var wasPlaying = this.state.playing;

                this.pause();

                this.setState({
                    currentSong: data,
                    current: this.state.current + 1,
                    wasPlaying: this.state.playing
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
        this.state.currentSong.stream.play();
        this.setState({
            playing: true
        });
    },
    pause: function() {
        this.state.currentSong && this.state.currentSong.stream.pause();
        this.setState({
            playing: false
        });
    },
    render: function() {
        var currentSong = '';

        if(this.state.currentSong) {
            currentSong =
                <CurrentSong
                    artworkURL={this.state.currentSong.track.artwork_url}
                    title={this.state.currentSong.track.title}
                    />;
        }

        return (
            <div>
                {currentSong}
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
