import * as Backbone from 'backbone';

var activityTemplate = require("./../templates/activity.handlebars");



class ActivityView extends Backbone.View {

    render() {
        return activityTemplate({activity: this.model});
    }
    
}

export default ActivityView;