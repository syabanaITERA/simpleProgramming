const solution = (arr) => {
    console.log(arr);
    if (arr.length == 1) {
        return arr[0];
    }

    return solution([...arr.splice(0, Math.ceil(arr.length/2))]) + solution(arr);
}

const main = () => {
    arr = [3, 4, 10, 2, 15];
    hasil = solution(arr);
    console.log(hasil);
}

main();