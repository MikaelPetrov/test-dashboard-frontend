import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { backIcon } from '../../icons/backIcon';
import Icon from '../../uiKit/Icon/Index';
import { TypeCardInfo } from '../Dashboard/types';
import styles from './MainCTAPage.module.scss';

type Props = {
  cardInfo: TypeCardInfo;
};

const MainCTAPage: React.FC<Props> = (props): JSX.Element => {
  let history = useHistory();
  const handleDashboardPage = () => {
    history.push(`/dashboard`);
  };

  return (
    <div>
      <div className={styles['title']}>{props.cardInfo.phase}</div>
      <div className={styles['result']}>{props.cardInfo.name}</div>
      <div className={styles['back']}>
        <Icon
          className={styles['back__icon']}
          path={backIcon.path}
          viewBox={backIcon.viewBox}
          title="BackIcon"
          onClick={handleDashboardPage}
        />
        <span className={styles['back__text']} onClick={handleDashboardPage}>
          Back
        </span>
      </div>
    </div>
  );
};

export default memo(MainCTAPage);
