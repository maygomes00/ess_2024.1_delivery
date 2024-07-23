import { HomeState, HomeStateAction } from "./types";

const homeStateReducer = (state: HomeState, action: HomeStateAction) => {
  switch (action.type) {
    case "CHANGE_CREATE_TEST_REQUEST_STATUS":
      return {
        ...state,
        createTestRequestStatus: action.payload,
      };
    case "CHANGE_GET_TESTS_REQUEST_STATUS":
      return {
        ...state,
        getTestsRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default homeStateReducer;

import { LoginState, AuthAction } from '../../../../shared/types/login-cliente';

export const authReducer = (state: LoginState, action: AuthAction): LoginState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
      case 'LOGOUT':
        return { ...state, user: null, };
    default:
      return state;
  }
};

// src/app/home/context/MainContext/AuthRestaurantReducer.ts
import { RestaurantLoginState, RestaurantAuthAction } from '../../../../shared/types/login-restaurant';

export const authRestaurantReducer = (state: RestaurantLoginState, action: RestaurantAuthAction): RestaurantLoginState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};



