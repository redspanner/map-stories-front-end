import { CALL_API, Schemas } from '../middleware/api';

export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';

export const getToken = (storyId, eventId) => ({
  [CALL_API]: {
    types: [ GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE ],
    endpoint: `/token/${storyId}/event/${eventId}`,
    method: 'GET',
  }
})

export const CREATE_STORY_REQUEST = 'CREATE_STORY_REQUEST';
export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
export const CREATE_STORY_FAILURE = 'CREATE_STORY_FAILURE';

export const createStory = (data) => ({
  [CALL_API]: {
    types: [ CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, CREATE_STORY_FAILURE ],
    endpoint: '/stories',
    schema: Schemas.STORY,
    method: 'POST',
    data: data,
  }
})

export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export const editEvent = (data, storyId) => ({
  [CALL_API]: {
    types: [ EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE ],
    endpoint: data._id !== undefined ? `/stories/${storyId}/event/${data._id}`: `/stories/${storyId}/event`,
    schema: Schemas.STORY,
    method: data._id !== undefined ? 'PUT' : 'POST',
    data: data,
  }
})

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const deleteEvent = (storyId, eventId) => ({
  [CALL_API]: {
    types: [ DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE ],
    endpoint: `/stories/${storyId}/event/${eventId}`,
    method: 'DELETE',
  },
  payload: {
    storyId,
    eventId
  }
})

export const STORIES_HP_REQUEST = 'STORIES_HP_REQUEST';
export const STORIES_HP_SUCCESS = 'STORIES_HP_SUCCESS';
export const STORIES_HP_FAILURE = 'STORIES_HP_FAILURE';

export const fetchStoriesHomePage = (page) => ({
  [CALL_API]: {
    types: [ STORIES_HP_REQUEST, STORIES_HP_SUCCESS, STORIES_HP_FAILURE ],
    endpoint: `/stories/?page=${page}`,
    schema: Schemas.STORY_ARRAY
  }
})

export const STORIES_USER_REQUEST = 'STORIES_USER_REQUEST';
export const STORIES_USER_SUCCESS = 'STORIES_USER_SUCCESS';
export const STORIES_USER_FAILURE = 'STORIES_USER_FAILURE';

export const fetchStoriesUserPage = () => ({
  [CALL_API]: {
    types: [ STORIES_USER_REQUEST, STORIES_USER_SUCCESS, STORIES_USER_FAILURE ],
    endpoint: `/me/stories`,
    schema: Schemas.STORY_ARRAY
  }
})

export const STORY_REQUEST = 'STORY_REQUEST';
export const STORY_SUCCESS = 'STORY_SUCCESS';
export const STORY_FAILURE = 'STORY_FAILURE';

export const fetchSingleStory = (storyId) => ({
  [CALL_API]: {
    types: [ STORY_REQUEST, STORY_SUCCESS, STORY_FAILURE ],
    endpoint: `/stories/${storyId}`,
    schema: Schemas.STORY
  }
})

export const DELETE_STORY_REQUEST = 'DELETE_STORY_REQUEST';
export const DELETE_STORY_SUCCESS = 'DELETE_STORY_SUCCESS';
export const DELETE_STORY_FAILURE = 'DELETE_STORY_FAILURE';

export const deleteStory = (storyId) => ({
  [CALL_API]: {
    method: 'DELETE',
    types: [ DELETE_STORY_REQUEST, DELETE_STORY_SUCCESS, DELETE_STORY_FAILURE ],
    endpoint: `/stories/${storyId}`,
  },
  payload: {
    storyId
  }
})

export const UPDATE_STORY_REQUEST = 'UPDATE_STORY_REQUEST';
export const UPDATE_STORY_SUCCESS = 'UPDATE_STORY_SUCCESS';
export const UPDATE_STORY_FAILURE = 'UPDATE_STORY_FAILURE';

export const updateStory = (storyId, data) => ({
  [CALL_API]: {
    method: 'PUT',
    types: [ UPDATE_STORY_REQUEST, UPDATE_STORY_SUCCESS, UPDATE_STORY_FAILURE ],
    endpoint: `/stories/${storyId}`,
    schema: Schemas.STORY,
    data
    }
})

export const STORIES_SEARCH_REQUEST = 'STORIES_SEARCH_REQUEST';
export const STORIES_SEARCH_SUCCESS = 'STORIES_SEARCH_SUCCESS';
export const STORIES_SEARCH_FAILURE = 'STORIES_SEARCH_FAILURE';

export const fetchStoriesSearch = (query) => ({
  [CALL_API]: {
    types: [ STORIES_SEARCH_REQUEST, STORIES_SEARCH_SUCCESS, STORIES_SEARCH_FAILURE ],
    endpoint: `/stories/?q=${query}`,
    schema: Schemas.STORY_ARRAY
  }
})

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUser = (data) => ({
  [CALL_API]: {
    types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
    endpoint: `/sign-up`,
    schema: Schemas.EDITOR,
    method: 'POST',
    data,
  }
})

export const logOutUser = () => ({
  type: 'LOGOUT_USER',
  payload: {}
})

export const clearSearch = () => ({
  type: 'CLEAR_SEARCH',
  payload: {}
})

export const activateSearch = () => ({
  type:'ACTIVATE_SEARCH'
})

export const deactivateSearch = () => ({
  type:'DEACTIVATE_SEARCH'
})

export const SHOW_ERROR = 'SHOW_ERROR';

export const showError = (errorMessage) => ({
  type: 'SHOW_ERROR',
  errorMessage
})
