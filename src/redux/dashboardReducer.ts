import { dashboardAPI } from '../api/dashboardApi';
import { TypeCard, TypeSite, TypeTest } from '../components/Dashboard/types';
import {
  SET_CARDS,
  SET_FOUNDED_CARDS,
  SET_SITES,
  SET_TESTS,
  SORTED_TYPE_CARDS,
} from './actionTypes';
import { TypeBaseThunk, TypeInferActions } from './reduxStore';

type TypeDashboardInitialState = typeof initialState;
type TypeAction = TypeInferActions<typeof actions>;
type TypeThunk = TypeBaseThunk<TypeAction>;

const initialState = {
  sites: [] as TypeSite[],
  tests: [] as TypeTest[],
  cards: [] as TypeCard[],
  foundedCards: [] as TypeCard[],
};

const dashboardReducer = (
  state = initialState,
  action: TypeAction,
): TypeDashboardInitialState => {
  switch (action.type) {
    case SET_SITES:
      return {
        ...state,
        sites: action.sites,
      };
    case SET_TESTS:
      return {
        ...state,
        tests: action.tests,
      };
    case SET_CARDS:
      return {
        ...state,
        cards: action.cards,
      };
    case SET_FOUNDED_CARDS:
      return {
        ...state,
        foundedCards: action.foundedCards,
      };
    case SORTED_TYPE_CARDS:
      return {
        ...state,
        foundedCards: action.foundedCards,
      };
    default:
      return state;
  }
};

export const actions = {
  actionSetSites: (sites: TypeSite[]) => ({ type: SET_SITES, sites } as const),
  actionSetTests: (tests: TypeTest[]) => ({ type: SET_TESTS, tests } as const),
  actionSetCards: (cards: TypeCard[]) => ({ type: SET_CARDS, cards } as const),
  actionFoundedCards: (foundedCards: TypeCard[]) =>
    ({ type: SET_FOUNDED_CARDS, foundedCards } as const),
  actionSortedTypeCards: (foundedCards: TypeCard[]) =>
    ({ type: SORTED_TYPE_CARDS, foundedCards } as const),
};

export const thunkGetSites = (sites: TypeSite): TypeThunk => async (
  dispatch,
) => {
  let data = await dashboardAPI.getSites(sites);
  dispatch(actions.actionSetSites(data));
};
export const thunkGetTests = (tests: TypeTest): TypeThunk => async (
  dispatch,
) => {
  let data = await dashboardAPI.getTests(tests);
  dispatch(actions.actionSetTests(data));
};
export const thunkGetCards = (tests: TypeTest[], sites: TypeSite[]) => (
  dispatch: any,
) => {
  const cards = tests.map((test: TypeTest) => {
    const foundUrl = sites.find((site: TypeSite) => site.id === test.siteId);
    return {
      ...test,
      url: foundUrl?.url!,
    };
  });
  dispatch(actions.actionSetCards(cards));
};
export const thunkFoundedCards = (cards: TypeCard[], searchValue: string) => (
  dispatch: any,
) => {
  const foundedCards = cards.filter((value) => {
    return value.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  dispatch(actions.actionFoundedCards(foundedCards));
};
export const thunkSortedTypeCards = (
  cards: TypeCard[],
  searchValue: string,
) => (dispatch: any) => {
  const foundedCards = cards.filter((value) => {
    return value.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  dispatch(actions.actionFoundedCards(foundedCards));
};

export default dashboardReducer;
