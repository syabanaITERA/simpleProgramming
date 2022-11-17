const solution = (num) => {
    tmp = num / Math.abs(num);
    num = Math.abs(num);
    tp = String(num).length;
    hasil = 0;

    while (String(hasil).length < tp) {
        hasil *= 10;
        hasil += num%10;
        num = Math.floor(num/10);
    }

    hasil *= tmp;

    return hasil;
}

const main = () => {
    angka = -3401;
    solusi = solution(angka);
    console.log(angka, solusi);
}

main();