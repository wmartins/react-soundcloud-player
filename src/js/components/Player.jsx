var React = require('react');
var CurrentSong = require('./CurrentSong');
var PlayerBar = require('./PlayerBar');
var SC = require('./SoundCloud');
var songs = require('../data/songs');
var Q = require('../vendor/q');

var Player = React.createClass({
    getInitialState: function() {
        return {
            songs: [],
            currentSong: {},
            current: 0
        };
    },
    _onBackwardClick: function() {
        console.log("[TODO] - Backward");
    },
    _onForwardClick: function() {
        console.log("[TODO] - Forward");
    },
    _onPlayPauseClick: function() {
        console.log("[TODO] - Play/Pause");
    },
    getSongInfo: function(trackId) {
        var dfd = Q.defer();

        SC.get('/tracks/' + trackId, function(data) {
            dfd.resolve(data);
        });

        return dfd.promise;
    },
    componentDidMount: function() {
        this.setState({
            songs: songs
        });

        this.getCurrentSongInfo();
    },
    getCurrentSongInfo: function() {
        this.getSongInfo(this.state.songs[this.state.current]).then(
            this.updateSongInfo
        );
    },
    updateSongInfo: function(data) {
        this.setState({
            currentSong: data
        });
    },
    render: function() {
        return (
            <div>
                <CurrentSong
                    artworkURL={this.state.currentSong.artwork_url}
                    title={this.state.currentSong.title}
                    />
                <PlayerBar
                    onBackwardClick={this._onBackwardClick}
                    onForwardClick={this._onForwardClick}
                    onPlayPauseClick={this._onPlayPauseClick}
                    />
            </div>
        );
    }
});

module.exports = Player;
