import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { TypeAppState } from '../../redux/reduxStore';
import { TypeCardInfo } from '../Dashboard/types';
import MainCTAPage from './MainCTAPage';

type TypeStateProps = {
  cardInfo: TypeCardInfo;
};
type TypeDispatchProps = {};
export type TypeMainCTAPageContainer = TypeStateProps & TypeDispatchProps;

const MainCTAPageContainer: React.FC<TypeMainCTAPageContainer> = (props): JSX.Element => {
  return <MainCTAPage cardInfo={props.cardInfo} />;
};

const mapStateToProps = (state: TypeAppState): TypeStateProps => {
  return {
    cardInfo: state.dashboardPage.cardInfo,
  };
};

export default compose<React.ComponentType>(connect(mapStateToProps, null))(MainCTAPageContainer);
