const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button')!;

//Array types
const numResults: number[] = [];
const textResults: string[] = [];

//Type alias
type NumOrString = number | string;
type Result = { val: number; timestamp: Date };

//Interface. Esta interface es lo mismo que cuando definimos Result
interface ResultObject {
    val: number; 
    timestamp: Date;
}

function add(num1: NumOrString, num2: NumOrString) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    } else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}

//How to define the object type
//Puedo usar tanto Result como ResultObject, definidos más arriba
function printResult(resultObj: ResultObject) {
    console.log(resultObj.val);
}

buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    const stringResult = add(num1, num2);
    // console.log(result);
    // console.log(stringResult);
    numResults.push(result as number);
    textResults.push(stringResult as string);
    printResult({ val: result as number, timestamp: new Date() });
    console.log(numResults, textResults);
})

const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('It worked!');
    }, 1000);
});

myPromise.then(result => {
    console.log(result.split('w'));
});
