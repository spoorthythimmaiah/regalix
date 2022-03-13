import Backbone from 'backbone';

class ActivityCollection extends Backbone.Collection {

    url() {
        return '/api/activity-feed/';
    }
}

export default ActivityCollection;