import React, { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { BurgerConstructorElementUIProps } from './type';
import { MoveButton } from '@zlden/react-developer-burger-ui-components';

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> = memo(
  ({
    ingredient,
    index,
    totalItems,
    handleMoveUp,
    handleMoveDown,
    handleClose
  }) => (
    <div className={styles.element}>
      <div className={styles.controls}>
        <MoveButton
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          extraClass={styles.moveButton}
        />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
      />
    </div>
  )
);