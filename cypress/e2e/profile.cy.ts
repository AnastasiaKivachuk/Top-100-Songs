import { PATH_INDEX, PATH_PROFILE } from '@constants/routes.constants';
import { FORM_FIELDS_ERRORS } from '@constants/messages.constants';
import firebase from '../../firebase.config';

const testAcc = 'test@test.test';
const testPassword = '123456';

describe('PROFILE', () => {
  beforeEach(() => {
    cy.visit(PATH_PROFILE);
    const user = firebase.auth().currentUser;
    if (!user) {
      firebase.auth().signInWithEmailAndPassword(testAcc, testPassword);
    }
  });

  it('should render text', () => {
    cy.contains('Update Profile');
  });

  it('displays 2 inputs', () => {
    cy.get('input').should('have.length', 2);
  });

  it('check first input type', () => {
    cy.get('input').last().type('1234');
    cy.get('input').last().should('have.value', '1234');
  });

  it('check invalid value on submit', () => {
    cy.get('[data-testid="btn"]').click();
    cy.contains(FORM_FIELDS_ERRORS.REQUIRED);
  });

  it('check cancel button', () => {
    cy.get('a').first().click();
    cy.get('[data-testid="avatar"]').click();
    cy.get('li').first().click();
    cy.get('[data-testid="cancelBtn"]').click();
    cy.url().should('include', PATH_INDEX);
  });

});
