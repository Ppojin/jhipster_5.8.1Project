import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/customer">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.btbCustomer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/qa-bank">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.qaQaBank" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/exam">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.examExam" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/exam-qa-bank">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.examExamQaBank" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/exam-student">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.examExamStudent" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/exam-result">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.examExamResult" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
