import {task1, task2, task3} from "./promiseUtils";

async function runSequentially(){
    try{
        console.log("Starte Sequenz...");

        const result1 = await task1();
        console.log(result1);

        const result2 = await task2();
        console.log(result2);

        const result3 = await task3();
        console.log(result3);

        console.log("Alle Tasks abgeschlossen");
    }catch(err){
        console.error("Fehler aufgetreten:", err);
    }
    }
    runSequentially();