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
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

const prisma = new PrismaClient(); //    // 5. Conectar a la base de datos usando Prisma

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
    console.log(process.env.DATABASE_URL);

    try {
        await prisma.$connect(); // 4. conectar con db
        // 5. Leer el archivo de taxis o los archivos de trayectorias según el tipo
        const taxisFilePath = path.join(directoryPath, 'taxis.txt');  // concatenar la ruta del directorio con el nombre de archivo txt
        if (type === 'taxis') {
            if (!fs.existsSync(taxisFilePath)) {
                console.error(`Taxis file does not exist: ${taxisFilePath}`);
                process.exit(1);
            }
        }
        const readStream = fs.createReadStream(taxisFilePath, { encoding: 'utf8' }); //leer file/archivo
        let buffer = '';
        readStream.on('data', async (chunk) => { // 1. Escuchar el evento 'data'
            buffer += chunk;
            let lines = buffer.split('\n');
            buffer = lines.pop() || '';  // Mantén la última línea parcial en el buffer

            for (const line of lines) {
                const [id, plate] = line.split(',');
                if (id && plate) {
                    try {
                        // Verificar si el taxi ya existe en la base de datos
                        const existingTaxi = await prisma.taxis.findUnique({
                            where: { id: parseInt(id) },
                        });

                        if (existingTaxi) {
                            console.log(`Taxi ID ${id} already exists in the database.`);
                        } else {
                            await prisma.taxis.create({
                                data: {
                                    id: parseInt(id),
                                    plate
                                }
                            });
                            console.log(`Inserted Taxi ID ${id} into the database.`);
                        }
                    } catch (error) {
                        console.error(`Error processing data for taxi ID ${id}:`, error);
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error reading taxis file:', error);
    } finally {
        await prisma.$disconnect();
    }

    //2. escuchar el event 'end'
    
    try {
        await prisma.$connect(); 
        const trajectoriesDirPath = path.join(directoryPath, 'trajectories');
        if (type === 'trajectories') {
            if (!fs.existsSync(trajectoriesDirPath)) {
                console.error(`Taxis file does not exist: ${trajectoriesDirPath}`);
                process.exit(1);
            }
        }
        const files = fs.readdirSync(trajectoriesDirPath);

        files.forEach(async (fileData) => {
            const filePath = path.join(trajectoriesDirPath, fileData);
            const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
            let buffer = '';

            readStream.on('data', async (chunk) => {
                buffer += chunk;
                let lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const [taxi_id, date, latitude, longitude, id] = line.split(',');
                    if (taxi_id && date && latitude && longitude && id) {
                        try {
                            // Aquí puedes insertar los datos en la base de datos
                            await prisma.trajectories.create({
                                data: {
                                    taxi_id: parseInt(taxi_id),
                                    date: new Date(date),
                                    latitude: parseFloat(latitude),
                                    longitude: parseFloat(longitude),
                                    id: parseInt(id)
                                }
                            });
                        } catch (error) {
                            console.error(`Error processing data for trajectory ID ${id}:`, error);
                        }
                    }
                }
            });

            readStream.on('end', () => {
                console.log(`Trajectories data from ${fileData} processed.`);
            });

            readStream.on('error', (error) => {
                console.error('Error reading trajectory file:', error);
            });
        });
    } catch (error) {
        console.error('Error reading trajectories directory:', error);
    }
}
    main()
        ;



// 6. Insertar los datos leídos en las tablas correspondientes




// 7. Confirmar que los datos se cargaron correctamente y cerrar la conexión a la base de datos
