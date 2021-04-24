import React, { memo, useEffect, useState } from 'react';
import { arrowIcon } from '../../icons/arrowIcon';
import Icon from '../../uiKit/Icon/Index';
import { TypeCard } from '../Dashboard/types';
import { fieldNames } from './constants';
import styles from './Header.module.scss';

type Props = {
  foundedCards: TypeCard[];
  thunkSortedCards: (foundedCards: TypeCard[], sortedField: string, isSortedDesc: boolean) => void;
};

const Header: React.FC<Props> = (props): JSX.Element => {
  const [isSortedDesc, setIsSortedDesc] = useState(false);
  const [sortFieldName, setSortFieldName] = useState('');

  const handleSortCards = (foundedCards: TypeCard[], sortedField: string, isSortedDesc: boolean) => {
    if (sortFieldName !== sortedField) {
      props.thunkSortedCards(foundedCards, sortedField, false);
    } else {
      props.thunkSortedCards(foundedCards, sortedField, isSortedDesc);
    }
    setSortFieldName(sortedField);
    setIsSortedDesc((prevState) => !prevState);
    // setIsSortedAsc(!isSortedAsc);
  };

  useEffect(() => {
    setIsSortedDesc(true);
  }, [sortFieldName]);

  return (
    <div className={styles['header']}>
      {fieldNames.map((obj) => {
        return (
          <div className={styles[obj.className]}>
            <div
              className={styles['wrapper']}
              onClick={() => handleSortCards(props.foundedCards, obj.fieldName, isSortedDesc)}
            >
              <span>{obj.fieldName}</span>
              {isSortedDesc && sortFieldName === obj.fieldName && (
                <Icon
                  className={styles['header__arrowUp-icon']}
                  path={arrowIcon.path}
                  viewBox={arrowIcon.viewBox}
                  title="ArrowUp"
                />
              )}
              {!isSortedDesc && sortFieldName === obj.fieldName && (
                <Icon
                  className={styles['header__arrowDown-icon']}
                  path={arrowIcon.path}
                  viewBox={arrowIcon.viewBox}
                  title="ArrowDown"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Header);
