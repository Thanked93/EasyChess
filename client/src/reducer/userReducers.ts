export interface userState {
  loggedIn: boolean;
  name: string;
}

export enum ActionType {
  LOGIN,
  LOGOUT,
}

interface Payload {
  name: string;
}

export interface Action {
  type: ActionType;
  payload: Payload;
}

export const userReducer = (state: userState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN: {
      return { ...state, loggedIn: true, name: action.payload?.name };
    }
    case ActionType.LOGOUT:
      return { ...state, loggedIn: false };

    default:
      return state;
  }
};
