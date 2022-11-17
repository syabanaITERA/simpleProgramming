import { stdout } from 'node:process';

const palindrome = (word) => {
    let i = 0;
    let j = word.length - 1;

    while (i < j) {
        if (word.charAt(i) != word.charAt(j)) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}

const kata = "racecar"

if (palindrome(kata)) {
    stdout.write("Kata "+kata+" merupakan Palindrome!!\n");
} else {
    stdout.write("Kata "+kata+" bukan merupakan Palindrome!!\n");
}