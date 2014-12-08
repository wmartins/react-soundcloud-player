var React = require('react');

var CurrentSong = React.createClass({
    render: function() {
        return (
            <div className="CurrentSong">
                <div className="CurrentSong-Artwork">
                    <img className="CurrentSong-Artwork-Img" src="http://upload.wikimedia.org/wikipedia/en/5/57/Coldplayparachutesalbumcover.jpg" />
                </div>
                <div className="CurrentSong-Song">
                    <span className="CurrentSong-Song-Name">Yellow</span>
                    <span className="CurrentSong-Song-Artist">Coldplay</span>
                </div>
            </div>
        );
    }
});

module.exports = CurrentSong;
