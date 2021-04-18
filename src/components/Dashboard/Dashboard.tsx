import { ChangeEvent, memo, useEffect, useState } from 'react';
import { searchIcon } from '../../icons/searchIcon';
import Icon from '../../uiKit/Icon/Index';
import Cards from '../Cards/Cards';
import styles from './Dashboard.module.scss';
import { TypeCard, TypeFieldNames } from './types';

type Props = {
  cards: TypeCard[];
  foundedCards: TypeCard[];
  fieldNames: TypeFieldNames[];
  thunkFoundedCards: (foundedCards: TypeCard[], searchValue: string) => void;
  thunkSortedCards: (foundedCards: TypeCard[], sortedField: string) => void;
  thunkCardInfo: (id: number, name: string, phase: string) => void;
};

const Dashboard: React.FC<Props> = (props): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  useEffect(() => {
    props.thunkFoundedCards(props.cards, searchValue);
  }, [searchValue]);

  return (
    <>
      <div className={styles['title']}>Dashboard</div>
      <div className={styles['search']}>
        <input
          value={searchValue}
          onChange={onSearchValueChange}
          placeholder="What test are you looking for?"
          type="input"
          className={styles['search__input']}
        />
        {
          <Icon
            className={styles['search__icon']}
            path={searchIcon.path}
            viewBox={searchIcon.viewBox}
            title="SearchIcon"
          />
        }
        <div className={styles['search__tests']}>{`${props.foundedCards.length} tests`}</div>
      </div>
      {props.foundedCards.length ? (
        <Cards
          foundedCards={props.foundedCards}
          fieldNames={props.fieldNames}
          thunkSortedCards={props.thunkSortedCards}
          thunkCardInfo={props.thunkCardInfo}
        />
      ) : (
        <div className={styles['notFounded']}>
          <div className={styles['notFounded__result']}>
            <span className={styles['notFounded__text']}>Your search did not match any results.</span>
          </div>
          <button onClick={() => setSearchValue('')} className={styles['notFounded__reset-button']}>
            <span>Reset</span>
          </button>
        </div>
      )}
    </>
  );
};

export default memo(Dashboard);
