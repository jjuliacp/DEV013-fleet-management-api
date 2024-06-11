// node upload-gps-data.js <path-to-files>
// --type=taxis|trajectories
// --dbname=<dbname>
// --host=<hostname>
// --port=<port>
// --username=<username>

// import inquirer from 'inquirer';

// const questions = [
//   {
//     type: 'password',
//     message: 'Enter your password',
//     name: 'password',
//     mask: '*'
//   }
// ];

// inquirer.prompt(questions)
//   .then((answers: { password: string }) => {
//     console.log("Hello, esta es una prueba: " + answers.password);
//   })
//   .catch(error => {
//     console.error("Error en la entrada del usuario:", error);
//   });

// 
// import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

// const prisma = new PrismaClient(); //    // 5. Conectar a la base de datos usando Prisma

async function main() {
    process.argv.forEach((val, index) => {
        console.log(`${index}: ${val}`);
    });

    // 1. Leer los argumentos de línea de comando usando process.argv

    // console.log("File path:", directoryPath); // ruta del directorio 
    const argv = process.argv.slice(2);

    // 2. Validar los argumentos y pedir los faltantes usando inquirer
    if (argv.length < 2) {
        console.error("Usage: ts-node upload-gps-data.ts <path-to-file> --type=<taxis|trajectories> --dbname=<dbname> --host=<hostname> --port=<port> --username=<username> --password=<password>");
        process.exit(1);
    }

    const inputPath = argv[0];

    const directoryPath = path.isAbsolute(inputPath) ? inputPath : path.join(__dirname, inputPath);
    console.log("Directory path:", directoryPath);

    let type, dbname, host, port, username, password
    argv.forEach(arg => {
        if (arg.startsWith('--type=')) {
            type = arg.split('=')[1];;
        } else if (arg.startsWith('--dbname=')) {
            dbname = arg.split('=')[1];
        } else if (arg.startsWith('--host=')) {
            host = arg.split('=')[1];
        } else if (arg.startsWith('--port=')) {
            port = arg.split('=')[1];
        } else if (arg.startsWith('--username=')) {
            username = arg.split('=')[1];
        } else if (arg.startsWith('--password=')) {
            password = arg.split('=')[1];
        }
    });
    const questions = [];
    if (!password) {
        questions.push(
            {
                type: 'password',
                name: 'password',
                message: 'Please provide the database password:',
                mask: '*'
            })
    }

    if (questions.length > 0) {
        const answers = await inquirer.prompt(questions);
        password = password || answers.password;
    }

    console.log(`Type: ${type}, DB Name: ${dbname}, Host: ${host}, Port: ${port}, Username: ${username}, Password: ${password}`);


    // 3. Construir la URL de conexión a la base de datos y configurarla en DATABASE_URL
    const dbUrl = `postgresql://${username}@${host}:${port}/${dbname}`;
    process.env.DATABASE_URL = dbUrl;
    console.log(dbUrl);

   // 2. Leer el archivo de taxis o los archivos de trayectorias según el tipo
// 6. Insertar los datos leídos en las tablas correspondientes

    if (type === 'taxis') {
        // Leer el archivo de taxis
        const taxisFilePath = path.join(directoryPath, 'taxis.txt'); // concatenar la ruta del directorio con el nombre de archivo txt
        try {
            const taxisData = fs.readFileSync(taxisFilePath, 'utf8'); //leer file/archivo
            // Aquí falta procesar los datos de los taxis
            console.log('Taxis data:', taxisData);
        } catch (error) {
            console.error('Error reading taxis file:', error);
        }
    } else if (type === 'trajectories') {
        // Leer los archivos de trayectorias en la carpeta "trajectories"
        const trajectoriesDirPath = path.join(directoryPath, 'trajectories');
        try {
            const files = fs.readdirSync(trajectoriesDirPath);
            files.forEach(fileData =>{
                const filePath =path.join(trajectoriesDirPath, fileData);
                const trajectoriesData  = fs.readFileSync(filePath, 'utf-8'); 
                console.log(`Trajectories data from ${fileData}:`, trajectoriesData);
            })
            console.log('Trajectories data:', files);
            
        } catch (error) {
            console.error('Error reading trajectories directory:', error);
        }
    }   
  
}
main()
 ;







// 7. Confirmar que los datos se cargaron correctamente y cerrar la conexión a la base de datos
