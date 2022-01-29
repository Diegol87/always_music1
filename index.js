//1. Realizar una conexion con PostgresSQL con la clase Client

const { Client } = require('pg')

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'alwaysmusic',
    password: 'esadiz87',
    port: 5432,
}

const comandos = process.argv.slice(2)

const client = new Client(config)

client.connect()

//2. Crear una funcion asincrona para registrar un nuevo estudiante en la base de datos

async function registrar() {
    const res = await client.query(`insert into estudiantes (Nombre, Rut, Curso, Nivel) values ('${comandos[1]}', '${comandos[2]}', '${comandos[3]}', '${comandos[4]}') RETURNING *;`)

    console.log(`El estudiante ${comandos[1]} fue registrado con exito`)
    client.end()
}

//3. Crear una funcion asincrona para obtener por consola el registro de un estudiante por medio de su rut

async function buscar() {
    const res = await client.query(`select * from estudiantes where Rut = '${comandos[1]}'`)

    console.log(`El estudiante con el rut "${comandos[1]}" es: `, res.rows)
    client.end()
}

//4. Crear una funcion asincrona para obteer por consola todos los estudiantes registrados

async function buscarTabla() {
    const res = await client.query(`select * from estudiantes`)

    console.log(`Registros `, res.rows)
    client.end()
}

//5. Crear una funcion asincrona para actualizar los datos de un estudiante en la base de datos

async function editarEstudiante() {
    const res = await client.query(`update estudiantes set Nivel = '${comandos[4]}' where Rut = '${comandos[2]}'`)

    console.log(`El estudiante ${comandos[1]} se ha editado con exito`)
    client.end()
}

//6. Crear una funcion asincrona para eliminar el registro de un estudiante de la base de datos

async function eliminarEstudiante() {
    const res = await client.query(`delete from estudiantes where Rut = '${comandos[1]}'`)

    console.log(`El estudiante ${comandos[1]} fue eliminado con exito`)
    client.end()
}

if(comandos[0] === 'nuevo') {
    registrar()
}

if(comandos[0] === 'consultar') {
    buscar()
}

if(comandos[0] === 'consultarTabla') {
    buscarTabla()
}

if(comandos[0] === 'editar') {
    editarEstudiante()
}

if(comandos[0] === 'eliminar') {
    eliminarEstudiante()
}
