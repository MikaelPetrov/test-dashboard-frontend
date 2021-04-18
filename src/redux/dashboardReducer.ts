import { dashboardAPI } from '../api/dashboardApi';
import { TypeCard, TypeCardInfo, TypeSite, TypeTest } from '../components/Dashboard/types';
import {
  capitalizeFirstLetter,
  capitalizeType,
  customSortWithoutStatus,
  customSortWithStatus,
  getURLWithoutProtocol,
} from '../utils/helpers';
import { TypeFieldNames } from './../components/Dashboard/types';
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
  fieldNames: [
    {
      fieldName: 'name',
      className: 'header__name',
    },
    {
      fieldName: 'type',
      className: 'header__type',
    },
    {
      fieldName: 'status',
      className: 'header__status',
    },
    {
      fieldName: 'url',
      className: 'header__url',
    },
  ] as TypeFieldNames[],
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

export const thunkGetSites = (sites: TypeSite): TypeThunk => async (dispatch) => {
  let data = await dashboardAPI.getSites(sites);
  dispatch(actions.actionSetSites(data));
};

export const thunkGetTests = (tests: TypeTest): TypeThunk => async (dispatch) => {
  let data = await dashboardAPI.getTests(tests);
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
  const withTransformedStatus = cards.map((obj) => {
    if (obj.status) {
      return { ...obj, status: capitalizeFirstLetter(obj.status) };
    }
    return obj;
  });
  const withTransformedType = withTransformedStatus.map((obj) => {
    if (obj.type) {
      return { ...obj, type: capitalizeType(obj.type) };
    }
    return obj;
  });
  const withTransformedUrl = withTransformedType.map((obj) => {
    if (obj.url) {
      return { ...obj, url: getURLWithoutProtocol(obj.url)! };
    }
    return obj;
  });
  const foundedCards = withTransformedUrl.filter((value) => {
    return value.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  dispatch(actions.actionFoundedCards(foundedCards));
};

export const thunkCardInfo = (id: number, name: string, phase: string) => (dispatch: any) => {
  dispatch(actions.actionCardInfo({ id, name, phase }));
};

export const thunkSortedCards = (foundedCards: TypeCard[], sortedField: string, isSortedAsc: boolean) => (
  dispatch: any,
) => {
  if (sortedField === 'status') {
    customSortWithStatus(foundedCards, sortedField, isSortedAsc);
  } else {
    customSortWithoutStatus(foundedCards, sortedField, isSortedAsc);
  }
  dispatch(actions.actionSortedCards(foundedCards));
};

export default dashboardReducer;
