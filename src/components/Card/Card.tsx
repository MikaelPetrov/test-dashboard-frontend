import classNames from 'classnames';
import { memo } from 'react';
import styles from './Card.module.scss';
import {
  capitalizeFirstLetter,
  capitalizeType,
  getURLWithoutProtocol,
} from './helpers';

type Props = {
  id: number;
  url: string;
  name: string;
  type: string;
  status: string;
  siteId: number;
  setResultTitle: React.Dispatch<React.SetStateAction<string>>;
  setResultValue: React.Dispatch<React.SetStateAction<string>>;
};

const Card: React.FC<Props> = (props): JSX.Element => {
  const capitalizedStatus = capitalizeFirstLetter(props.status);

  const resultData = () => {
    props.setResultTitle(
      `${capitalizedStatus === 'Draft' ? 'Finalize' : 'Results'}`,
    );
    props.setResultValue(`${props.name}`);
  };
  const getStatusClassNames = (): string => {
    return classNames(styles['card__status'], {
      [styles['card__status_paused']]: capitalizedStatus === 'Paused',
      [styles['card__status_draft']]: capitalizedStatus === 'Draft',
      [styles['card__status_online']]: capitalizedStatus === 'Online',
      [styles['card__status_stopped']]: capitalizedStatus === 'Stopped',
    });
  };
  const getIndicatorClassNames = (): string => {
    return classNames(styles['card__indicator'], {
      [styles['card__indicator_dark-red']]: props.siteId === 1,
      [styles['card__indicator_purple']]: props.siteId === 3,
      [styles['card__indicator_light-purple']]: props.siteId === 2,
    });
  };

  return (
    <div className={styles['card']}>
      <div className={getIndicatorClassNames()} />
      <div className={styles['card__name']}>{props.name}</div>
      <div className={styles['card__type']}>{capitalizeType(props.type)}</div>
      <div className={getStatusClassNames()}>{capitalizedStatus}</div>
      <div className={styles['card__site']}>
        {getURLWithoutProtocol(props.url)}
      </div>
      <div className={styles['card__result']}>
        <button
          onClick={resultData}
          className={classNames(styles['card__result-button'], {
            [styles['card__finalize-button']]: capitalizedStatus === 'Draft',
          })}
        >
          {capitalizedStatus === 'Draft' ? 'Finalize' : 'Results'}
        </button>
      </div>
    </div>
  );
};

export default memo(Card);
