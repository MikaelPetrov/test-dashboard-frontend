import { memo } from 'react';
import { TypeCard, TypeFieldNames } from '../Dashboard/types';
import Card from './Card';
import Header from './Header';

type Props = {
  foundedCards: TypeCard[];
  fieldNames: TypeFieldNames[];
  thunkSortedCards: (foundedCards: TypeCard[], sortedField: string) => void;
  thunkCardInfo: (id: number, name: string, phase: string) => void;
};

const Cards: React.FC<Props> = (props): JSX.Element => {
  return (
    <>
      <Header
        foundedCards={props.foundedCards}
        thunkSortedCards={props.thunkSortedCards}
        fieldNames={props.fieldNames}
      />
      {props.foundedCards.map((card) => {
        return <Card key={card.id} thunkCardInfo={props.thunkCardInfo} {...card} />;
      })}
    </>
  );
};

export default memo(Cards);
