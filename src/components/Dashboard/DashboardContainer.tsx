import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  thunkFoundedCards,
  thunkGetCards,
  thunkGetSites,
  thunkGetTests,
} from '../../redux/dashboardReducer';
import { TypeAppState } from '../../redux/reduxStore';
import Dashboard from './Dashboard';
import { TypeCard, TypeSite, TypeTest } from './types';

type TypeStateProps = {
  sites: TypeSite[];
  tests: TypeTest[];
  cards: TypeCard[];
  foundedCards: TypeCard[];
};
type TypeDispatchProps = {
  thunkGetSites: (sites: TypeSite[]) => void;
  thunkGetTests: (tests: TypeTest[]) => void;
  thunkGetCards: (tests: TypeTest[], sites: TypeSite[]) => void;
  thunkFoundedCards: (foundedCards: TypeCard[], searchValue: string) => void;
};
export type TypeDashboardContainer = TypeStateProps & TypeDispatchProps;

const DashboardContainer: React.FC<TypeDashboardContainer> = (
  props,
): JSX.Element => {
  useEffect(() => {
    props.thunkGetSites(props.sites);
    props.thunkGetTests(props.tests);
  }, []);

  useEffect(() => {
    props.thunkGetCards(props.tests, props.sites);
  }, [props.tests, props.sites]);

  useEffect(() => {
    props.thunkFoundedCards(props.cards, '');
  }, [props.cards]);

  return (
    <>
      <Dashboard
        cards={props.cards}
        foundedCards={props.foundedCards}
        thunkFoundedCards={props.thunkFoundedCards}
      />
    </>
  );
};

const mapStateToProps = (state: TypeAppState): TypeStateProps => {
  return {
    sites: state.dashboardPage.sites,
    tests: state.dashboardPage.tests,
    cards: state.dashboardPage.cards,
    foundedCards: state.dashboardPage.foundedCards,
  };
};
const mapDispatchToProps = {
  thunkGetSites,
  thunkGetTests,
  thunkGetCards,
  thunkFoundedCards,
};
export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
)(DashboardContainer);
