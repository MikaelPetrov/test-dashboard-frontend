import React, { memo, useState } from 'react';
import { arrowIcon } from '../../icons/arrowIcon';
import Icon from '../../uiKit/Icon/Index';
import { TypeCard, TypeFieldNames } from '../Dashboard/types';
import styles from './Header.module.scss';

type Props = {
  foundedCards: TypeCard[];
  fieldNames: TypeFieldNames[];
  thunkSortedCards: (foundedCards: TypeCard[], sortedField: string, isSortedAsc: boolean) => void;
};

const Header: React.FC<Props> = (props): JSX.Element => {
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const [sortFieldName, setsortFieldName] = useState('');

  const handleSortCards = (foundedCards: TypeCard[], sortedField: string, isSortedAsc: boolean) => {
    props.thunkSortedCards(foundedCards, sortedField, isSortedAsc);
    setsortFieldName(sortedField);
    setIsSortedAsc((prevState) => !prevState);
    // setIsSortedAsc(!isSortedAsc);
  };

  return (
    <div className={styles['header']}>
      {props.fieldNames.map((obj) => {
        return (
          <div className={styles[obj.className]}>
            <div
              className={styles['wrapper']}
              onClick={() => handleSortCards(props.foundedCards, obj.fieldName, isSortedAsc)}
            >
              <span>{obj.fieldName}</span>
              {isSortedAsc && sortFieldName === obj.fieldName && (
                <Icon
                  className={styles['header__arrowUp-icon']}
                  path={arrowIcon.path}
                  viewBox={arrowIcon.viewBox}
                  title="ArrowUp"
                />
              )}
              {!isSortedAsc && sortFieldName === obj.fieldName && (
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
