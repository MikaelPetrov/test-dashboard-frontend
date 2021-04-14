import { memo } from 'react';
import { TypeCard } from '../Dashboard/types';
import Card from './Card';
import Header from './Header';

type Props = {
  foundedCards: TypeCard[];
  setResultTitle: React.Dispatch<React.SetStateAction<string>>;
  setResultValue: React.Dispatch<React.SetStateAction<string>>;
};

const Cards: React.FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <Header foundedCards={props.foundedCards} />
      {props.foundedCards.map((card) => {
        return (
          <Card
            setResultTitle={props.setResultTitle}
            setResultValue={props.setResultValue}
            {...card}
          />
        );
      })}
    </div>
  );
};

export default memo(Cards);
