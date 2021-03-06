var React = require('react'),
    PlayerBar;

PlayerBar = React.createClass({
    _onBackwardClick: function() {
        this.props.onBackwardClick();
    },
    _onForwardClick: function() {
        this.props.onForwardClick();
    },
    _onPlayPauseClick: function() {
        this.props.onPlayPauseClick();
    },
    render: function() {
        var playPauseClass = this.props.playing ? 'fa-pause' : 'fa-play';

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
                    <span className={'fa ' + playPauseClass}></span>
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
