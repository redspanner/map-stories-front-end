import * as actions from  '../actions'

const defaultState = {
  editors: {},
  stories: {}
}

const entities = (state = defaultState, action) => {
  if(action.response && action.response.entities) {
    return {
      ...state,
      editors: {
        ...state.editors,
        ...action.response.entities.editors
      },
      stories: {
        ...state.stories,
        ...action.response.entities.stories,
      }
    };
  } else {
    switch (action.type) {
      case actions.DELETE_EVENT_SUCCESS:
        return {
          ...state,
          stories: {
            ...state.stories,
            [action.payload.storyId]: {
              ...state.stories[action.payload.storyId],
              events: state.stories[action.payload.storyId].events
                .filter(event => event.id !== action.payload.eventId)
            }
          }
        }
        break;
      default:

    }
  }
  return state;
};

export default entities;
