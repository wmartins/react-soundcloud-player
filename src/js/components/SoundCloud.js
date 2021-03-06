var Q = require('../vendor/q'),
    memo = {},
    SoundCloud;

SC.initialize({
    client_id: 'a3831dc9f09bc0d2bb73906a46ec3e08',
    redirect_uri: '0.0.0.0:8000'
});

SoundCloud = {
    getTrack: function(trackId) {
        return this.getTrackInfo(trackId).then(
            this.getTrackStream
        );
    },
    getTrackInfo: function(trackId) {
        var dfd = Q.defer();

        if(memo[trackId]) {
            dfd.resolve(memo[trackId].track);
        } else {
            SC.get('/tracks/' + trackId, function(track) {
                dfd.resolve(track);
            });
        }

        return dfd.promise;
    },
    getTrackStream: function(track) {
        var dfd = Q.defer();

        if(memo[track.id]) {
            dfd.resolve(memo[track.id]);
        } else {
            SC.stream('/tracks/' + track.id, function(stream) {
                if(!memo[track.id]) {
                    memo[track.id] = {
                        track: track,
                        stream: stream
                    };
                }
                dfd.resolve(memo[track.id]);
            });
        }

        return dfd.promise;
    }
};

module.exports = SoundCloud;
