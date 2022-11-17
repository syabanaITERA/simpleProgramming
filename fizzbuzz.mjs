import { stdout } from "node:process";

const fizzbuzz = (total) => {
    for (let i = 1; i <= total; i++) {
        if (i%3 == 0 || i%5 == 0) {
            if (i%3 == 0) {
                stdout.write("Fizz");
            }

            if (i%5 == 0) {
                stdout.write("Buzz");
            }
            stdout.write("\n");
        } else {
            stdout.write(String(i) + "\n");
        }
    }
}

fizzbuzz(100);