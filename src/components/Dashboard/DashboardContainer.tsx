import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  thunkCardInfo,
  thunkFoundedCards,
  thunkGetCards,
  thunkGetSites,
  thunkGetTests,
  thunkSortedCards,
} from '../../redux/dashboardReducer';
import { TypeAppState } from '../../redux/reduxStore';
import Dashboard from './Dashboard';
import { TypeCard, TypeCardInfo, TypeSite, TypeTest } from './types';

type TypeStateProps = {
  sites: TypeSite[];
  tests: TypeTest[];
  cards: TypeCard[];
  foundedCards: TypeCard[];
  cardInfo: TypeCardInfo;
};
type TypeDispatchProps = {
  thunkGetSites: () => void;
  thunkGetTests: () => void;
  thunkGetCards: (tests: TypeTest[], sites: TypeSite[]) => void;
  thunkFoundedCards: (foundedCards: TypeCard[], searchValue: string) => void;
  thunkSortedCards: (foundedCards: TypeCard[], sortedField: string) => void;
  thunkCardInfo: (id: number, name: string, phase: string) => void;
};
export type TypeDashboardContainer = TypeStateProps & TypeDispatchProps;

const DashboardContainer: React.FC<TypeDashboardContainer> = (props): JSX.Element => {
  useEffect(() => {
    props.thunkGetSites();
    props.thunkGetTests();
  }, []);

  useEffect(() => {
    props.thunkGetCards(props.tests, props.sites);
  }, [props.tests, props.sites]);

  useEffect(() => {
    props.thunkFoundedCards(props.cards, '');
  }, [props.cards]);

  return (
    <Dashboard
      cards={props.cards}
      foundedCards={props.foundedCards}
      thunkFoundedCards={props.thunkFoundedCards}
      thunkSortedCards={props.thunkSortedCards}
      thunkCardInfo={props.thunkCardInfo}
    />
  );
};

const mapStateToProps = (state: TypeAppState): TypeStateProps => {
  return {
    sites: state.dashboardPage.sites,
    tests: state.dashboardPage.tests,
    cards: state.dashboardPage.cards,
    foundedCards: state.dashboardPage.foundedCards,
    cardInfo: state.dashboardPage.cardInfo,
  };
};
const mapDispatchToProps = {
  thunkGetSites,
  thunkGetTests,
  thunkGetCards,
  thunkFoundedCards,
  thunkSortedCards,
  thunkCardInfo,
};
export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps))(DashboardContainer);
