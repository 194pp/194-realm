import React from 'react';
import Person from "./Person/Person";

const persons = (props) => props.persons.map((person, index) => {
    return <Person
      click={() => this.deletePersonHandler(index)}
      name={person.name}
      key={person.id}
      age={person.age}
      changed={(event) => this.nameChangedHandler(event, person.id)}/>
  }
)