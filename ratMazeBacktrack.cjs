const { stdout } = require('node:process');

// Contoh soal permasalahan penentuan jalur tikus untuk keluar dari Maze.
// comp => Papan Maze.
// st => Lokasi tikus memulai untuk masuk ke jalur.
// fn => Lokasi keluar dari Maze.
const board =  {
    comp : [
        [1,1,1,1,1,1,1,1,1],
        [1,0,1,0,1,1,1,0,0],
        [1,0,0,0,1,0,0,0,1],
        [1,1,1,0,1,0,1,1,1],
        [1,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,0,0,0,1],
        [1,1,1,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1]
    ],
    st : [1,8],
    fi : [5,7]
}

// Fungsi untuk mencetak Maze
const printMaze = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0) {
                stdout.write(' '+' ');
            } else if (board[i][j] == 1) {
                stdout.write('#'+' ');
            } else {
                stdout.write('.'+' ');
            }
        }
        stdout.write('\n');
    }
}

// Fungsi untuk menggabungkan comp dengan sol
const switchMaze = (board, solution) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0 && solution[i][j] == 1) {
                board[i][j] = 2;
            }
        }
    }
}

// Fungsi utama untuk wadah penentuan jalur tikus menggunakan Backtracking.
const solveMaze = (board, cur, fin) => {
    let sol = new Array(board.length);

    for (let i = 0; i < sol.length; i++) {
        sol[i] = new Array(board[i].length);
        for (let j = 0; j < sol[i].length; j++) {
            sol[i][j] = 0;
        }
    }

    if (backTrack(board, cur, fin, sol)) {
        switchMaze(board, sol);
        printMaze(board);
    } else {
        console.log('Tidak Bisa Diselesaikan!!');
    }
}

// Fungsi untuk cek posisi agar tidak keluar jalur atau tidak menabrak tembok.
const isNotWall = (board, block) => {
    return (block[0] >= 0 && block[1] >= 0 && block[0] < board.length && block[1] < board[0].length && board[block[0]][block[1]] == 0);
}

// Penerapan Algoritma Backtracking ini menggunakan pendekatan Recursive
const backTrack = (board, cur, fin, solution) => {
    // Pertama, titik posisi sekarang diperiksa terlebih dahulu
    // apakah sudah berada di titik finish atau tidak.
    if (cur[0] === fin[0] && cur[1] === fin[1] && board[fin[0]][fin[1]] == 0) {
        solution[cur[0]][cur[1]] = 1;
        return true;
    }

    // Kedua, titik posisi sekarang diperiksa lagi
    // apakah titik tersebut tidak menabrak tembok atau berada di jalur yang seharusnya.
    // Jika iya, maka masuk ke tahap penandaan jalan sampai recursive.
    // Jika tidak, maka proses dihentikan.
    // Pada Recursive, fungsi - fungsi yang terpanggil akan berjalan seperti biasa
    // walaupun salah satu mengeluarkan nilai false.
    if (isNotWall(board, cur)) {
        // Sebelum jalan, periksa kembali apakah jalan tersebut sudah pernah dilewati
        // atau belum.
        if (solution[cur[0]][cur[1]] == 1) {
            return false;
        }

        // Penandaan jalan.
        solution[cur[0]][cur[1]] = 1;

        // Konsep Recursive ini menggunakan pendekatan arah mata angin
        // yang dimana sistem akan memeriksa jalan hingga sampai menemukan
        // titik finish.

        // Arah Selatan.
        if (backTrack(board, [cur[0] + 1, cur[1]], fin, solution)) {
            return true;
        }
        // Arah Utara.
        if (backTrack(board, [cur[0] - 1, cur[1]], fin, solution)) {
            return true;
        }
        // Arah Timur.
        if (backTrack(board, [cur[0], cur[1] + 1], fin, solution)) {
            return true;
        }
        // Arah Barat.
        if (backTrack(board, [cur[0], cur[1] - 1], fin, solution)) {
            return true;
        }

        // Jika arah mata angin tersebut tidak menemukan jalan terbaik,
        // maka sistem akan mundur ke posisi sebelumnya (Backtrack).
        solution[cur[0]][cur[1]] = '.';
        return false;
    }

    return false;
}

printMaze(board.comp);

stdout.write('\n');

solveMaze(board.comp, board.st, board.fi);