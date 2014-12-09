var React = require('react'),
    CurrentSong;

CurrentSong = React.createClass({
    render: function() {
        return (
            <div className="CurrentSong">
                <div className="CurrentSong-Artwork">
                    <img className="CurrentSong-Artwork-Img" src={this.props.artworkURL} />
                </div>
                <div className="CurrentSong-Song">
                    {this.props.title}
                </div>
            </div>
        );
    }
});

module.exports = CurrentSong;
