import React, {Component} from 'react';
import '../css/Viewer.css';
import { connect } from 'react-redux';
import { fetchSingleStory, showError } from '../actions';
import { Card, CardHeader } from 'material-ui/Card';
import EventCard from '../components/EventCard';
import RaisedButton from 'material-ui/RaisedButton';
import Map from '../components/Map';

class Viewer extends Component {

  state = {
    currentEventIndex: 0,
    numberOfEvents: this.props.stories[this.props.match.params.storyId].events.length,
  }

  componentWillMount() {
    if (!this.props.match.params.storyId) return null;
    this.props.loadStory(this.props.match.params.storyId);
  }

  renderEvent = (event) => {
    if(!event) return null;
    const { title, dateAndTime, mapLocation } = event;
    const styles = {
      title: {
        fontWeight: 'bold',
      },
      subtitle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
      }
    }
    return (
      <Card className="Titles">
        <CardHeader
          title={title}
          titleStyle={styles.title}
          subtitle={dateAndTime ? `${mapLocation} at ${dateAndTime}` : mapLocation}
          subtitleStyle={styles.subtitle}
        />
      </Card>
    )
  }

  renderAttachments = (attachments) => {
    if(!attachments) return null;
    return attachments.map((attachment, i) => <EventCard key={i} data={{attachments: [attachment]}} expanded />);
  }

  currentStory = () => this.props.stories[this.props.match.params.storyId];

  next = () => {
    if (this.state.currentEventIndex < this.state.numberOfEvents - 1) {
      this.setState({
        ...this.state,
        currentEventIndex: this.state.currentEventIndex + 1,
      })
    } else return;
  };
  prev = () => {
    if (this.state.currentEventIndex > 0) {
      this.setState({
        ...this.state,
        currentEventIndex: this.state.currentEventIndex - 1,
      })
    } else return;
  };

  render() {
    const story = this.currentStory();
    if (!story.events) return null;
    const event = story.events[this.state.currentEventIndex];
    let marker = {};
    if (event && event.location && event.location.lng && event.location.lat) marker = event.location;
    else return null;
    return (
      <div className="Viewer">
        <div className="MapViewer">
          <div className="EventsContainerWrapper">
            <div className="EventsContainer">
              <div className="ButtonContainer">
                 <RaisedButton onClick={this.prev}
                   disabled={this.state.currentEventIndex > 0 ? false : true}
                   label="Prev"/>
                 <RaisedButton onClick={this.next}
                   disabled={this.state.currentEventIndex < this.state.numberOfEvents - 1? false : true}
                   label="Next"/>
              </div>
              {this.renderEvent(event)}
              {event !== undefined ? this.renderAttachments(event.attachments) : null}
            </div>
          </div>
          <Map marker={marker}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stories: state.entities.stories,
});

const mapDispatchToProps = (dispatch) => ({
  loadStory: (storyId) => dispatch(fetchSingleStory(storyId)),
  showError: (errorMessage) => dispatch(showError(errorMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
