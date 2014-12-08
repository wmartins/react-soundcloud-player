var React = require('react');
var CurrentSong = require('./CurrentSong');
var PlayerBar = require('./PlayerBar');

var Player = React.createClass({
    render: function() {
        return (
            <div>
                <CurrentSong />
                <PlayerBar />
            </div>
        );
    }
});

module.exports = Player;
