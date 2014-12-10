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
            songs: songs,
            length: songs.length
        });

        this.setTrackTimer();
        this.addEventListeners();

        this.next();
    },
    setTrackTimer: function() {
        setInterval(function() {
            if(this.state.playing) {
                this.setState({
                    position: this.state.currentSong.stream.position
                });

                if(this.state.position >= this.state.duration) {
                    if(this.hasNext()) {
                        this.next();
                    }
                    else {
                        this.stop();
                    }
                }
            }
        }.bind(this), 1000);
    },
    hasNext: function() {
        return !!(this.state.length - this.state.current - 1);
    },
    next: function() {
        if(this.hasNext()) {
            SC.getTrack(
                this.state.songs[this.state.current + 1]
            ).then(function(data) {
                var wasPlaying = this.state.playing;

                this.stop();

                this.setState({
                    currentSong: data,
                    current: this.state.current + 1,
                    wasPlaying: this.state.playing,
                    currentArtworkURL: data.track.artwork_url,
                    currentTitle: data.track.title,
                    duration: data.track.duration,
                    position: 0
                });

                wasPlaying && this.play();
            }.bind(this));
        }
    },
    hasPrev: function() {
        return this.state.current > 0;
    },
    prev: function() {
        if(this.hasPrev()) {
            SC.getTrack(songs[this.state.current - 1]).then(function(data) {
                var wasPlaying = this.state.playing;

                this.stop();

                this.setState({
                    currentSong: data,
                    current: this.state.current - 1,
                    wasPlaying: this.state.playing,
                    currentArtworkURL: data.track.artwork_url,
                    currentTitle: data.track.title,
                    duration: data.track.duration,
                    position: 0
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
    stop: function() {
        if(this.state.currentSong.stream) {
            this.state.currentSong.stream.stop();
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
                <PlayerTrack
                    duration={this.state.duration}
                    position={this.state.position}
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
