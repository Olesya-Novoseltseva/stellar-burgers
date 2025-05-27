import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';
import { TConstructorIngredient } from '@utils-types'; 

const BunPlaceholder: FC<{ position: 'top' | 'bottom' }> = ({ position }) => (
  <div className={`${styles.noBuns} ${styles[`noBuns${position === 'top' ? 'Top' : 'Bottom'}`]} ml-8 mb-4 mr-5 text text_type_main-default`}>
    Выберите булки
  </div>
);

const IngredientsPlaceholder: FC = () => (
  <div className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}>
    Выберите начинку
  </div>
);

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems = { bun: null, ingredients: [] },
  orderRequest = false,
  price = 0,
  orderModalData = null,
  error = null,
  onOrderClick,
  closeOrderModal
}) => {
  const hasBun = !!constructorItems.bun;
  const hasIngredients = constructorItems.ingredients.length > 0;

  return (
    <section className={styles.burger_constructor}>
      {/* Верхняя булка */}
      {hasBun ? (
        <div className={`${styles.element} mb-4 mr-4`}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${constructorItems.bun!.name} (верх)`}
            price={constructorItems.bun!.price}
            thumbnail={constructorItems.bun!.image}
          />
        </div>
      ) : (
        <BunPlaceholder position="top" />
      )}

      {/* Начинка */}
      <ul className={styles.elements}>
        {hasIngredients ? (
          constructorItems.ingredients.map((item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              key={item.id}
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
            />
          ))
        ) : (
          <IngredientsPlaceholder />
        )}
      </ul>

      {/* Нижняя булка */}
      {hasBun ? (
        <div className={`${styles.element} mt-4 mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${constructorItems.bun!.name} (низ)`}
            price={constructorItems.bun!.price}
            thumbnail={constructorItems.bun!.image}
          />
        </div>
      ) : (
        <BunPlaceholder position="bottom" />
      )}

      {/* Итого и кнопка */}
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onOrderClick}
          disabled={!hasBun || orderRequest}
        >
          Оформить заказ
        </Button>
      </div>

      {error && (
        <p className={`${styles.error} text text_type_main-default mt-4`}>
          {error}
        </p>
      )}

      {orderRequest && (
        <Modal onClose={closeOrderModal} title="Оформляем заказ...">
          <Preloader />
        </Modal>
      )}

      {orderModalData && !orderRequest && (
        <Modal onClose={closeOrderModal} title={orderRequest ? 'Оформляем заказ...' : ''}>
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};