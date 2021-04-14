import { ChangeEvent, memo, useEffect, useState } from 'react';
import { backIcon } from '../../icons';
import Icon from '../../uiKit/Icon/Index';
import styles from './Dashboard.module.scss';
import DashboardContent from './DashboardContent';
import { TypeCard } from './types';

type Props = {
  cards: TypeCard[];
  foundedCards: TypeCard[];
  thunkFoundedCards: (foundedCards: TypeCard[], searchValue: string) => void;
};

const Dashboard: React.FC<Props> = (props): JSX.Element => {
  const [resultTitle, setResultTitle] = useState('Dashboard');
  const [resultValue, setResultValue] = useState('');

  const [searchValue, setSearchValue] = useState<string>('');
  const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  useEffect(() => {
    props.thunkFoundedCards(props.cards, searchValue);
  }, [searchValue]);

  return (
    <div>
      <div className={styles['dashboard']}>
        <div className={styles['dashboard__title']}>{resultTitle}</div>
        {resultTitle === 'Dashboard' ? (
          <DashboardContent
            foundedCards={props.foundedCards}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearchValueChange={onSearchValueChange}
            setResultTitle={setResultTitle}
            setResultValue={setResultValue}
          />
        ) : (
          <div>
            <div className={styles['result']}>{resultValue}</div>
            <div className={styles['back']}>
              <Icon
                className={styles['back__icon']}
                path={backIcon.path}
                viewBox={backIcon.viewBox}
                title="BackIcon"
                onClick={() => {
                  setResultTitle('Dashboard');
                }}
              />
              <span
                className={styles['back__text']}
                onClick={() => {
                  setResultTitle('Dashboard');
                }}
              >
                Back
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Dashboard);
