const fs = require('fs');

fs.writeFile('info.txt', 'Node.js is awesome', 'utf8', (writeErr) => {
    if(writeErr){
        console.error('Ошибка при записи файла:', writeErr);
    }else{
        console.log('Файл "info.txt" успешно создан записан.');
    
    fs.readFile('info.txt', 'utf8', (readErr, data) => {
        if(readErr){
            console.error('Ошибка при чтении файла:', readErr);
        }else{
            console.log('Содержимое файла "info.txt":');
            console.log(data);
        }
    });
    }
} );