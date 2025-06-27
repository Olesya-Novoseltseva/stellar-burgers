/// <reference types="cypress" />

const TEST_URL = 'http://localhost:4000';

const SELECTORS = {
  MODAL: '#modals',
  MODAL_CLOSE: '#modals button',
  CONSTRUCTOR_SECTION: 'section',
  ORDER_BUTTON: 'Оформить заказ',
  INGREDIENT_ACTION: '.constructor-element__action'
};

const INGREDIENTS = {
  BUN: 'Флюоресцентная булка R2-D3',
  MAIN: 'Говяжий метеорит (отбивная)'
};

describe('Страница конструктора', () => {
  describe('Без авторизации', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit(TEST_URL);
    });

    describe('Сборка бургера', () => {
      it('Должен добавлять ингредиенты в конструктор', () => {
        cy.contains(INGREDIENTS.MAIN).parent().find('button').click();
        cy.contains(INGREDIENTS.BUN).parent().find('button').click();

        cy.contains(SELECTORS.ORDER_BUTTON)
          .parent()
          .parent(SELECTORS.CONSTRUCTOR_SECTION)
          .within(() => {
            cy.contains(INGREDIENTS.MAIN).should('exist');
            cy.contains(INGREDIENTS.BUN).should('exist');
            cy.contains('4976').should('exist');
          });
      });

      it('Должен удалять начинку из конструктора', () => {
        cy.contains(INGREDIENTS.MAIN).parent().find('button').click();
        cy.contains(INGREDIENTS.BUN).parent().find('button').click();

        cy.contains(SELECTORS.ORDER_BUTTON)
          .parent()
          .parent(SELECTORS.CONSTRUCTOR_SECTION)
          .within(() => {
            cy.contains(INGREDIENTS.MAIN)
              .parent()
              .find(SELECTORS.INGREDIENT_ACTION)
              .click();

            cy.contains('1976').should('exist'); // цена только булки * 2
          });
      });
    });

    describe('Модальное окно ингредиента', () => {
      beforeEach(() => {
        cy.contains(INGREDIENTS.MAIN).parent().click();
      });

      it('Открывает модалку по клику', () => {
        cy.get(SELECTORS.MODAL).contains(INGREDIENTS.MAIN).should('exist');
      });

      it('Закрывает модалку по крестику', () => {
        cy.get(SELECTORS.MODAL_CLOSE).click();
        cy.get(SELECTORS.MODAL).should('not.contain.html');
      });

      it('Закрывает модалку по клику вне окна', () => {
        cy.get(SELECTORS.MODAL).parent().click('topRight');
      });
    });
  });

  describe('С авторизацией', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'testAccessToken');

      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'testRefresh');
      });

      cy.intercept('GET', '/api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');

      cy.intercept('GET', '/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit(TEST_URL);
    });

    afterEach(() => {
      cy.clearCookie('accessToken');

      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
    });

    it('Оформляет заказ и показывает номер', () => {
      cy.intercept('POST', '/api/orders', {
        fixture: 'order.json',
        delay: 100
      }).as('postOrder');

      cy.contains(INGREDIENTS.MAIN).parent().find('button').click();
      cy.contains(INGREDIENTS.BUN).parent().find('button').click();

      cy.contains(SELECTORS.ORDER_BUTTON).click();
      cy.contains('Оформляем заказ...').should('exist');

      cy.wait('@postOrder').then(() => {
        cy.get(SELECTORS.MODAL).contains('79183').should('exist');
        cy.get(SELECTORS.MODAL).parent().click('topRight');
        cy.get(SELECTORS.MODAL).should('not.contain.html');

        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');

        cy.contains(SELECTORS.ORDER_BUTTON).parent().contains('0').should('exist');
      });
    });
  });
});
