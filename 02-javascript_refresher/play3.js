const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    });
    return promise;
};

setTimeout(() => {
    console.log('Timer is done!');
    fetchData()
        .then(text => {
            console.log(text);
            return fetchData();
        })
        .then(text2 => {
            console.log(text2);
        });
}, 2000);

console.log('Hello!');
console.log('hi!');

//Challenge
// Promise.resolve().then(() => console.log(1));

// setTimeout(() => console.log(2), 10);

// queueMicrotask(() => {
//     console.log(3);
//     queueMicrotask(() => console.log(4));
// });

// console.log(5);