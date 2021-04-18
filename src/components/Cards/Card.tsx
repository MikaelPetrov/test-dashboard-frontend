import classNames from 'classnames';
import { memo } from 'react';
import { useHistory } from 'react-router';
import styles from './Card.module.scss';

type Props = {
  key: number;
  id: number;
  url: string;
  name: string;
  type: string;
  status: string;
  siteId: number;
  thunkCardInfo: (id: number, name: string, phase: string) => void;
};

const Card: React.FC<Props> = (props): JSX.Element => {
  // const params = useParams<any>();
  // console.log(params);

  let history = useHistory();

  const getMainCTAName = () => {
    if (props.status === 'Draft') {
      return 'Finalize';
    }
    return 'Results';
  };
  const handleMainCTA = () => {
    history.push(`/${getMainCTAName().toLowerCase()}/${props.id}`);
    props.thunkCardInfo(props.id, props.name, getMainCTAName());
  };
  const getStatusClassNames = (): string => {
    return classNames(styles['card__status'], {
      [styles['card__status_paused']]: props.status === 'Paused',
      [styles['card__status_draft']]: props.status === 'Draft',
      [styles['card__status_online']]: props.status === 'Online',
      [styles['card__status_stopped']]: props.status === 'Stopped',
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
      <div className={styles['card__type']}>{props.type}</div>
      <div className={getStatusClassNames()}>{props.status}</div>
      <div className={styles['card__site']}>{props.url}</div>
      <div className={styles['card__result']}>
        <button
          onClick={handleMainCTA}
          className={classNames(styles['card__result-button'], {
            [styles['card__finalize-button']]: props.status === 'Draft',
          })}
        >
          {getMainCTAName()}
        </button>
      </div>
    </div>
  );
};

export default memo(Card);
