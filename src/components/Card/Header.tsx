import { memo, useState } from 'react';
import { arrowIcon } from '../../icons';
import Icon from '../../uiKit/Icon/Index';
import { TypeCard } from '../Dashboard/types';
import styles from './Header.module.scss';

type Props = {
  foundedCards: TypeCard[];
};

const Header: React.FC<Props> = (props): JSX.Element => {
  const [sortedField, setSortedField] = useState('type');

  console.log(
    props.foundedCards.sort((a: any, b: any) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      return 1;
    }),
  );

  // if (!sort) {
  //   console.log(setSort(true))
  //   // console.log(setSort(true), props.foundedCards.sort(() => -1))
  // } else if (sort) {
  //   console.log(setSort(false))
  //   // console.log(setSort(false), props.foundedCards.sort(() => 1))
  // }

  // setSort(true);
  // console.log(props.foundedCards.sort((a: any, b: any) => {

  // if (a.type < b.type) {
  //   return -1;
  // } else if (a.type > b.type) {
  //   return 1;
  // } else {
  //   return 0
  //   // }
  // }))
  // const sortZA = () => {
  //   setSort(false);
  //   console.log(props.foundedCards.sort((a: any, b: any) => {
  //     return b.type - a.type
  //   }))
  // };

  return (
    <div className={styles['header']}>
      <div className={styles['header__name']}>
        <span>name</span>
      </div>
      <div className={styles['header__type']}>
        <span onClick={() => setSortedField('type')}>type</span>
        {!sortedField && (
          <Icon
            className={styles['header__arrowUp-icon']}
            path={arrowIcon.path}
            viewBox={arrowIcon.viewBox}
            title="ArrowUp"
            // onClick={sortAZ}
          />
        )}
        {sortedField && (
          <Icon
            className={styles['header__arrowDown-icon']}
            path={arrowIcon.path}
            viewBox={arrowIcon.viewBox}
            title="ArrowDown"
            // onClick={sortZA}
          />
        )}
      </div>
      <div className={styles['header__status']}>
        <span>status</span>
      </div>
      <div className={styles['header__site']}>
        <span>site</span>
      </div>
    </div>
  );
};

export default memo(Header);
