var React = require('react');

var PlayerBar = React.createClass({
    render: function() {
        return (
            <div className="PlayerBar">
                <span className="PlayerControl">
                    <span className="fa fa-step-backward"></span>
                </span>
                <span className="PlayerControl">
                    <span className="fa fa-pause"></span>
                </span>
                <span className="PlayerControl">
                    <span className="fa fa-step-forward"></span>
                </span>
            </div>
        );
    }
});

module.exports = PlayerBar;
