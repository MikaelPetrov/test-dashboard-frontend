import { dashboardAPI } from '../api/dashboardApi';
import { TypeCard, TypeCardInfo, TypeSite, TypeTest } from '../components/Dashboard/types';
import {
  capitalizeFirstLetter,
  capitalizeType,
  getURLWithoutProtocol,
  sortByStatusField,
  sortFields,
} from '../utils/helpers';
import { SET_CARDS, SET_CARD_INFO, SET_FOUNDED_CARDS, SET_SITES, SET_TESTS, SORTED_CARDS } from './actionTypes';
import { TypeBaseThunk, TypeInferActions } from './reduxStore';

type TypeInitialState = typeof initialState;
type TypeAction = TypeInferActions<typeof actions>;
type TypeThunk = TypeBaseThunk<TypeAction>;

const initialState = {
  sites: [] as TypeSite[],
  tests: [] as TypeTest[],
  cards: [] as TypeCard[],
  foundedCards: [] as TypeCard[],
  cardInfo: {} as TypeCardInfo,
};

const dashboardReducer = (state = initialState, action: TypeAction): TypeInitialState => {
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
    case SET_CARD_INFO:
      return {
        ...state,
        cardInfo: action.cardInfo,
      };
    case SORTED_CARDS:
      return {
        ...state,
        foundedCards: [...action.sortedCards],
      };
    default:
      return state;
  }
};

export const actions = {
  actionSetSites: (sites: TypeSite[]) => ({ type: SET_SITES, sites } as const),
  actionSetTests: (tests: TypeTest[]) => ({ type: SET_TESTS, tests } as const),
  actionSetCards: (cards: TypeCard[]) => ({ type: SET_CARDS, cards } as const),
  actionFoundedCards: (foundedCards: TypeCard[]) => ({ type: SET_FOUNDED_CARDS, foundedCards } as const),
  actionSortedCards: (sortedCards: TypeCard[]) => ({ type: SORTED_CARDS, sortedCards } as const),
  actionCardInfo: (cardInfo: TypeCardInfo) => ({ type: SET_CARD_INFO, cardInfo } as const),
};

export const thunkGetSites = (): TypeThunk => async (dispatch) => {
  let data = await dashboardAPI.getSites();
  dispatch(actions.actionSetSites(data));
};

export const thunkGetTests = (): TypeThunk => async (dispatch) => {
  let data = await dashboardAPI.getTests();
  dispatch(actions.actionSetTests(data));
};

export const thunkGetCards = (tests: TypeTest[], sites: TypeSite[]) => (dispatch: any) => {
  const cards = tests.map((test: TypeTest) => {
    const foundUrl = sites.find((site: TypeSite) => site.id === test.siteId);
    return {
      ...test,
      url: foundUrl?.url!,
    };
  });
  dispatch(actions.actionSetCards(cards));
};

export const thunkFoundedCards = (cards: TypeCard[], searchValue: string) => (dispatch: any) => {
  const transformedCards = cards.map((obj) => {
    return {
      ...obj,
      status: capitalizeFirstLetter(obj.status),
      type: capitalizeType(obj.type),
      url: getURLWithoutProtocol(obj.url)!,
    };
  });
  const foundedCards = transformedCards.filter((value) => {
    return value.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  dispatch(actions.actionFoundedCards(foundedCards));
};

export const thunkSortedCards = (foundedCards: TypeCard[], sortedField: string, isSortedDesc: boolean) => (
  dispatch: any,
) => {
  if (sortedField === 'status') {
    sortByStatusField(foundedCards, sortedField, isSortedDesc);
  } else {
    sortFields(foundedCards, sortedField, isSortedDesc);
  }
  dispatch(actions.actionSortedCards(foundedCards));
};

export const thunkCardInfo = (id: number, name: string, phase: string) => (dispatch: any) => {
  dispatch(actions.actionCardInfo({ id, name, phase }));
};

export default dashboardReducer;
