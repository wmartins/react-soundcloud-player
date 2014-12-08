var React = require('react');

var PlayerBar = React.createClass({
    _onBackwardClick: function() {
        console.log("[TODO] - Backward");
    },
    _onForwardClick: function() {
        console.log("[TODO] - Forward");
    },
    _onPlayPauseClick: function() {
        console.log("[TODO] - Play/Pause");
    },
    render: function() {
        return (
            <div className="PlayerBar">
                <span
                    onClick={this._onBackwardClick}
                    className="PlayerControl">
                    <span className="fa fa-step-backward"></span>
                </span>
                <span
                    onClick={this._onPlayPauseClick}
                    className="PlayerControl">
                    <span className="fa fa-pause"></span>
                </span>
                <span
                    onClick={this._onForwardClick}
                    className="PlayerControl">
                    <span className="fa fa-step-forward"></span>
                </span>
            </div>
        );
    }
});

module.exports = PlayerBar;
