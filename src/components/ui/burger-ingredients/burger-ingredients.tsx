import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick,
    handleAdd
  }) => (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab 
            value='bun' 
            active={currentTab === 'bun'} 
            onClick={onTabClick}
            aria-selected={currentTab === 'bun'}
          >
            Булки
          </Tab>
          <Tab
            value='main'
            active={currentTab === 'main'}
            onClick={onTabClick}
            aria-selected={currentTab === 'main'}
          >
            Начинки
          </Tab>
          <Tab
            value='sauce'
            active={currentTab === 'sauce'}
            onClick={onTabClick}
            aria-selected={currentTab === 'sauce'}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.content}>
        <IngredientsCategory
          title='Булки'
          titleRef={titleBunRef}
          ingredients={buns}
          ref={bunsRef}
          handleAdd={handleAdd}
          data-cy='bun-ingredients'
        />
        <IngredientsCategory
          title='Начинки'
          titleRef={titleMainRef}
          ingredients={mains}
          ref={mainsRef}
          handleAdd={handleAdd}
          data-cy='main-ingredients'
        />
        <IngredientsCategory
          title='Соусы'
          titleRef={titleSaucesRef}
          ingredients={sauces}
          ref={saucesRef}
          handleAdd={handleAdd}
          data-cy='sauce-ingredients'
        />
      </div>
    </section>
  )
);