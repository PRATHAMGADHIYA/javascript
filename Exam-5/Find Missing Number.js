const findMissingNumber = () => {

    let arr = [1, 2, 4, 5, 6]
    let n = arr.length;

    let N = (n * (n + 1)) / 2;
    let missing = 0;
    for (let i = 0; i < n; i++) {
        missing += arr[i];
    }
    
    let missingNumber = missing - N;

    console.log(missingNumber);
}
findMissingNumber();
