var React = require('react');

var PlayerTrack = React.createClass({
    render: function() {
        var style = {
            width: (
                (this.props.position / this.props.duration) * 100 + '%'
            )
        };

        return (
            <div className="PlayerTrack" style={style}>
            </div>
        );
    }
});

module.exports = PlayerTrack;
