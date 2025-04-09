const person = {
    name: 'Antonio',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

//Destructuring

const printName = ( { name } ) => {
    console.log(name)
}

printName(person);

const { name, age } = person;
console.log(name, age);

// // person.greet();

const hobbies = ['Deportes', 'Cocinar'];



// // for (let hobby of hobbies) {
// //     console.log(hobby);
// // }

// // console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// // console.log(hobbies);

// // hobbies.push('Programming');

// //Maneras de copiar un array

// // const copiedArray = hobbies.slice();
// const copiedArray = [...hobbies];

// console.log(hobbies);


// //Rest operator
// //Se llama así a usar ... en una función.

// const toArray = (...args) => {
//     return args;
// };

// console.log(toArray(1,2,3,4,5));