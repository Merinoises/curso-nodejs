const nombre = 'Antonio';
let age = 29;
const hasHobbies = true;

age = 33;

const summarizeUser = (userName, userAge, userHasHobby) => {
    return (
        'Name is ' +
        userName +
        ', age is ' +
        userAge +
        ' and user has hobbies: ' +
        userHasHobby
    );
};

// const addOne = a => a + 1;
const addRandom = () => 1 + 2;


console.log(addOne(1));

console.log(summarizeUser(nombre, age, hasHobbies));