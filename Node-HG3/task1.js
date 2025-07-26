const fs = require('fs');

const folderName = 'myFolder';
fs.mkdir(folderName, (err) => {
    if (err) {
        console.log('Ошибка при создании каталога:', err);
    }else{
        console.log(`Каталог создан "${folderName}" успешно создан.`);



    fs.rmdir(folderName, (err)=>{
        if(err){
            console.error('Ошибка при удалении каталога:', err);
        }else {
            console.log(`Каталог "${folderName}" успешно удален.`);
        }
        
    });
    }
});