import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editEvent, deleteEvent, fetchSingleStory, showError } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';

class EditorPage extends Component {

  state = {
    currentEventIndex: 0,
    showPrev: false,
    showNext: true,
    coordinates: {},
  }

  constructor (props) {
    super(props);
    this.props.fetchSingleStory(props.computedMatch.params.storyId);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.story.events && nextProps.story.events.length > 1) this.setState({ showNext:true });
  }

  newEvent = () => ({
    title: '',
    index: this.state.currentEventIndex ? this.state.currentEventIndex+1 : 0,
    mapLocation: '',
    dateAndTime: '',
    attachments: []
  })

  onEventEdit = (event) => {
    const storyId = this.props.story._id;
    event.location = this.state.coordinates;
    if (event.title === '') {
      this.props.showError('Please provide a title for your event');
      return;
    }
    if (!event.location.lng || !event.location.lat) {
      this.props.showError('Please provide geo-coordinates for your event (click on the map)');
      return;
    }
    this.props.editEvent(event, storyId);
    this.props.story.events[this.state.currentEventIndex] = event;
    this.goNext();
  }

  onEventDelete = (eventId) => {
    const storyId = this.props.story._id;
    this.props.deleteEvent(storyId, eventId);
  }

  goNext = () => {
    this.setState({
      showNext: this.props.story.events[this.state.currentEventIndex+1] !== undefined,
      showPrev: true,
      currentEventIndex: this.state.currentEventIndex+1
    })
  }

  goPrev = () => {
    if(this.state.currentEventIndex === 0) return;
    this.setState({
      showNext: true,
      showPrev: this.state.currentEventIndex > 1,
      currentEventIndex: this.state.currentEventIndex-1
    })
  }

  markerAdded = (coordinates) => {
    this.setState({
      coordinates
    })
  }

  renderEventInfo () {
    //TODO how could it possibly be a fucking string?
    if(!this.props.story.events || typeof this.props.story.events[0] === 'string') return null;

    const currentEvent = this.props.story.events[this.state.currentEventIndex]
      ? this.props.story.events[this.state.currentEventIndex]
      : this.newEvent();

    return (
      <EventInfo
        event={currentEvent}
        eventIndex={this.state.currentEventIndex}
        totalEvents={this.props.story.events.length}
        onEventEdit={this.onEventEdit}
        onEventDelete={this.onEventDelete}
        showPrev={this.state.showPrev}
        showNext={this.state.showNext}
        goNext={this.goNext}
        goPrev={this.goPrev}
      />
    )
  }

  render () {

    const event = this.props.story.events[this.state.currentEventIndex];
    let marker = undefined;
    if (event && event.location) marker = event.location;

    return (
      <div className="EditorPage">
        <div className="EventInfoDiv">
          {this.renderEventInfo()}
        </div>
        <div className="MapTimeLine">
          <Map marker={marker} onMarkerAdded={this.markerAdded} editor />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  story: state.entities.stories[ownProps.computedMatch.params.storyId],
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleStory: (storyId) => dispatch(fetchSingleStory(storyId)),
  editEvent: (data, storyId) => dispatch(editEvent(data, storyId)),
  deleteEvent: (storyId, eventId) => dispatch(deleteEvent(storyId, eventId)),
  showError: (errorMessage) => dispatch(showError(errorMessage)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorPage));
