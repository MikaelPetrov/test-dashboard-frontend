import { ChangeEvent, memo } from 'react';
import { searchIcon } from '../../icons';
import Icon from '../../uiKit/Icon/Index';
import Cards from '../Card/Cards';
import styles from './Dashboard.module.scss';
import { TypeCard } from './types';

type Props = {
  foundedCards: TypeCard[];
  searchValue: string;
  onSearchValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setResultTitle: React.Dispatch<React.SetStateAction<string>>;
  setResultValue: React.Dispatch<React.SetStateAction<string>>;
};

const DashboardContent: React.FC<Props> = (props) => {
  return (
    <>
      <div className={styles['search']}>
        <input
          value={props.searchValue}
          onChange={props.onSearchValueChange}
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
        <div className={styles['search__tests']}>
          {`${props.foundedCards.length} tests`}
        </div>
      </div>
      {props.foundedCards.length ? (
        <Cards
          foundedCards={props.foundedCards}
          setResultTitle={props.setResultTitle}
          setResultValue={props.setResultValue}
        />
      ) : (
        <div className={styles['notFounded']}>
          <div className={styles['notFounded__result']}>
            <span className={styles['notFounded__text']}>
              Your search did not match any results.
            </span>
          </div>
          <button
            onClick={() => props.setSearchValue('')}
            className={styles['notFounded__reset-button']}
          >
            <span>Reset</span>
          </button>
        </div>
      )}
    </>
  );
};

export default memo(DashboardContent);
