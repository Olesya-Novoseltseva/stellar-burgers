import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

const NUTRITION_FACTS = [
  { label: 'Калории, ккал', key: 'calories' },
  { label: 'Белки, г', key: 'proteins' },
  { label: 'Жиры, г', key: 'fat' },
  { label: 'Углеводы, г', key: 'carbohydrates' }
] as const;

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    if (!ingredientData) {
      return (
        <div className="text text_type_main-default">
          Ингредиент не найден
        </div>
      );
    }

    const { name, image_large, ...nutrition } = ingredientData;

    return (
      <div className={styles.content} data-testid="ingredient-details">
        <img
          className={styles.img}
          alt={`Изображение ингредиента: ${name}`}
          src={image_large}
          loading="lazy"
        />
        <h3 className="text text_type_main-medium mt-2 mb-4">{name}</h3>
        <ul className={`${styles.nutritional_values} text_type_main-default`}>
          {NUTRITION_FACTS.map(({ label, key }) => (
            <li 
              className={styles.nutritional_value} 
              key={key}
              data-testid={`nutrition-${key}`}
            >
              <p className={`text mb-2 ${styles.text}`}>{label}</p>
              <p className="text text_type_digits-default">
                {nutrition[key]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);