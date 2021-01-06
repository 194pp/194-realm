import React from 'react';
import classes from "./Cockpit.module.scss";

const cockpit = (props) => {
  const classesArr = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  if (props.persons.length <= 2) {
    classesArr.push(classes.red);
  }
  if (props.persons.length <= 1) {
    classesArr.push(classes.bold);
  }

  return(
    <div className={classes.Cockpit}>
      <h1 className={classes.red}>194-realm.xyz</h1>
      <p className={classesArr.join(' ')}>The Main Menu</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
    </div>
  );
};

export default cockpit;