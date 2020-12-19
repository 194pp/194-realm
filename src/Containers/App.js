import React, { Component } from 'react';
import styles from './App.module.scss';
import Person from '../Components/Persons/Person/Person';
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const classLister = styleObject => (...classList) =>
  classList.reduce((list, myClass) => {
    let output = list;
    if (styleObject[myClass]) {
      if (list) output += ' '; // appends a space if list is not empty
      output += styleObject[myClass];
      //Above: append 'myClass' from styleObject to the list if it is defined
    }
    return output;
  }, '');

const classes = classLister(styles);
// <div className={classes('App', 'bold', 'd-flex-c')}> USAGE

class App extends Component {
  state = {
    persons: [
      {id: 1, name: 'Max', age: 28 },
      {id: 2, name: 'Manu', age: 29 },
      {id: 3, name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState( {persons: persons} );
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; //spread operator '...'
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {
    let persons = null;
    let btnClass = [styles.button];

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                key={person.id}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );
      btnClass.push(styles.red);
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red);
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles.bold);
    }

    return (
      <div className={styles.App}>
        <h1 className={styles.TestBorder}>194-realm.xyz</h1>
        <p className={classes.join(' ')}>The Main Menu</p>
        <button
          className={btnClass.join(' ')}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    )
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
