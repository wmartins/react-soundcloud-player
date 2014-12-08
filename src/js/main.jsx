var React = require('react');
var Player = require('./components/Player');
var SC = require('./components/SoundCloud');

React.render(
    <Player />,
    document.getElementsByClassName('js-player')[0]
);
