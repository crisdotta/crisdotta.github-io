const personas = [];
function mostrarPersonas(){
    let texto = "";
    for(let persona of personas){
        console.log(persona);
        texto += `<li> ${persona.nombre} ${persona.apellido} </li>
        <button id="btn-eliminar">
        <ion-icon name="trash-outline" onclick="eliminarPersona(${persona.id})"></ion-icon>
        </button>
        <br/>
        `;
    }
    document.getElementById("personas").innerHTML = texto;

}
function agregarPersona(){
    const forma = document.forms["forma"];
    const nombre = forma["nombre"];
    const apellido = forma["apellido"];

    let text = "No hay informacion para agregar";
    let texto = `<p> ${text} </p>`;
    let div = document.getElementById("sinInfo");
    if(nombre.value != "" && apellido.value != ""){
        const persona = new Persona(nombre.value, apellido.value);
        console.log(persona);
        personas.push(persona);
        mostrarPersonas();
        div.innerHTML = "";
    }else{
        console.log("No hay informacion para agregar");
        div.innerHTML = texto;
    }
    forma.reset();
}
function eliminarPersona(id){
    let indiceEliminar = personas.findIndex(persona=>persona.id === id);
    personas.splice(indiceEliminar, 1);
    mostrarPersonas();
}