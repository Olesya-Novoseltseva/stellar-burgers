import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems = { bun: null, ingredients: [] },
  orderRequest = false,
  price = 0,
  orderModalData = null,
  error = null,
  onOrderClick,
  closeOrderModal
}) => {
  const ingredients = constructorItems.ingredients || [];

  return (
    <section className={styles.burger_constructor}>
      {/* Верхняя булка */}
      {constructorItems.bun ? (
        <div className={`${styles.element} mb-4 mr-4`}>
          <ConstructorElement
            type='top'
            isLocked
            text={`${constructorItems.bun.name} (верх)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}>
          Выберите булки
        </div>
      )}

      {/* Начинка */}
      <ul className={styles.elements}>
        {ingredients.length > 0 ? (
          ingredients.map((item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={ingredients.length}
              key={item.id}
            />
          ))
        ) : (
          <div className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}>
            Выберите начинку
          </div>
        )}
      </ul>

      {/* Нижняя булка */}
      {constructorItems.bun ? (
        <div className={`${styles.element} mt-4 mr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked
            text={`${constructorItems.bun.name} (низ)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}>
          Выберите булки
        </div>
      )}

      {/* Итого и кнопка */}
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          children='Оформить заказ'
          onClick={onOrderClick}
          disabled={!constructorItems.bun || orderRequest}
        />
      </div>

      {/* Сообщение об ошибке */}
      {error && (
        <p className={`${styles.error} text text_type_main-default mt-4`}>
          {error}
        </p>
      )}

      {/* Модальные окна */}
      {orderRequest && (
        <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
          <Preloader />
        </Modal>
      )}

      {orderModalData && (
        <Modal
          onClose={closeOrderModal}
          title={orderRequest ? 'Оформляем заказ...' : ''}
        >
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};