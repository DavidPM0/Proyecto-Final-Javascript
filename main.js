const card = document.getElementById("card");
const resultado = document.getElementById("resultado");
const inicia = document.getElementById("inicia");
const registro = document.getElementById("registro");
const modal_close = document.getElementById("modal_close");
const carrito = document.getElementById("carrito");
const comprar_ahora = document.getElementById("comprar_ahora");
let allproducts = [];
const autos=[
    {id: 1,nombre: "KIA Picanto Luxe",img: "./img/picanto.png",velocidad: 161,motor: "kappa 1.0 MPI",aceleracion: 13.7,puerta: 5,plazas: 5,maletero: "255 l"},
    {id: 2,nombre: "Kia Stringer Sedan",img: "./img/kia.png",velocidad: 240,motor: "Motor Theta II 2.0 T-GDI",aceleracion: 6.0,puerta: 5,plazas: 5,maletero: "406 l"},
    {id: 3,nombre: "Toyota Hilux",img: "./img/hilux.png",velocidad: 175,motor: "Motor 1GD-FTV",aceleracion: 9.2,puerta: 4,plazas: 5,maletero: "471 l"},
    {id: 4,nombre: "Audi R8",img: "./img/r8.png",velocidad: 330,motor: "V10, FSI",aceleracion: 3.2,puerta: 2,plazas: 2,maletero: "112 l"},
    {id: 5,nombre: "Lamborghini Huracan",img: "./img/lambo.png",velocidad: 325,motor: "Motor V10",aceleracion: 3.4,puerta: 2,plazas: 2,maletero: "112 l"}
];
function agregar_autos(container, cards) {
    for (const card of cards) {
        const card_container = document.createElement("div");
        card_container.classList.add("auto");
        card_container.innerHTML = `
                <img src="${card.img}">
                <div class="contenido">
                    <h3>${card.nombre}</h3>
                    <h3>${card.velocidad} Km/h</h3>
                </div>
                <button class="btn_auto" data-auto-id="${card.id}">Seleccionar</button>
        `;
        container.appendChild(card_container);
    }
}
agregar_autos(card, autos);
function guardar_resultado(valor,identificacion) {
    localStorage.setItem('resultado', JSON.stringify(valor));
    let resultados = [JSON.parse(localStorage.getItem('resultado'))];
    const datos = resultados.find(dato => dato.id === identificacion);
    const datos_container = document.createElement('div');
    datos_container.setAttribute("id","resultado_bloque")
    datos_container.classList.add('resultado_card');
    datos_container.innerHTML = `
        <img src="${datos.img}">
            <div class="datos_card">
                <div class="datos_generales">
                    <div class="datos_contenido">
                    <h1>${datos.nombre}</h1>
                    </div>
                    <div class="datos">
                        <div class="info"><i class="fas fa-wind"></i> Max-velocidad: ${datos.velocidad} km/hr</div>
                        <div class="info"><i class="fas fa-cog"></i> Motor: ${datos.motor}</div>
                        <div class="info"><i class="fas fa-stopwatch"></i> 0-100 km: ${datos.aceleracion} seg</div>
                        <div class="info"><i class="fas fa-door-closed"></i> Puertas: ${datos.puerta}</div>
                        <div class="info"><i class="fas fa-user-friends"></i> Plazas: ${datos.plazas}</div>
                        <div class="info"><i class="fas fa-box"></i> Maletero: ${datos.maletero}</div>
                    </div>
                    <button onclick="mostrar(event,${datos.id})" class="btn_mostrar" data-mostrar-id="${datos.id}">Mostrar Vendedores</button>
                    <button onclick="borrar()" class="btn_eliminar" data-eliminar-id="${datos.id}">Eliminar</button>
                </div>
            </div>
        `;
    let resultado_existe = document.getElementsByClassName('resultado_card');
    let borrar = document.getElementById("resultado_bloque");
    if(resultado_existe.length===0 && resultados){
        resultado.appendChild(datos_container);
    }else{
        resultado.removeChild(borrar);
        resultado.appendChild(datos_container);
    }
}
const auto_seleccion = document.querySelectorAll(".btn_auto");
auto_seleccion.forEach(button => {
    button.addEventListener("click", (event) => {
        const child_vendedores = document.getElementById("vendedores");
        while (child_vendedores.firstChild) {
            child_vendedores.removeChild(child_vendedores.firstChild);
        }
        const auto_id = parseInt(event.target.getAttribute("data-auto-id"));
        const datos = autos.find(auto => auto.id === auto_id);
        if (datos) {
            guardar_resultado(datos,auto_id);
        }
    });
});
(()=>{
    let activo_resultado = JSON.parse(localStorage.getItem('resultado'));
    if(activo_resultado!=null){
        const activo_datos_container = document.createElement('div');
        activo_datos_container.setAttribute("id","resultado_bloque")
        activo_datos_container.classList.add('resultado_card');
        activo_datos_container.innerHTML = `
            <img src="${activo_resultado.img}">
                <div class="datos_card">
                    <div class="datos_generales">
                        <div class="datos_contenido">
                            <h1>${activo_resultado.nombre}</h1>
                        </div>
                        <div class="datos">
                            <div class="info"><i class="fas fa-wind"></i> Max-velocidad: ${activo_resultado.velocidad} km/hr</div>
                            <div class="info"><i class="fas fa-cog"></i> Motor: ${activo_resultado.motor}</div>
                            <div class="info"><i class="fas fa-stopwatch"></i> 0-100 km: ${activo_resultado.aceleracion} seg</div>
                            <div class="info"><i class="fas fa-door-closed"></i> Puertas: ${activo_resultado.puerta}</div>
                            <div class="info"><i class="fas fa-user-friends"></i> Plazas: ${activo_resultado.plazas}</div>
                            <div class="info"><i class="fas fa-box"></i> Maletero: ${activo_resultado.maletero}</div>
                        </div>
                        <button onclick="mostrar(event,${activo_resultado.id})" class="btn_mostrar" data-mostrar-id="${activo_resultado.id}">Mostrar Vendedores</button>
                        <button onclick="borrar()" class="btn_eliminar" data-eliminar-id="${activo_resultado.id}">Eliminar</button>
                    </div>
                </div>
            `;
        resultado.appendChild(activo_datos_container);
    }
})();
function borrar(){
    localStorage.clear();
    location.reload();
}
inicia.addEventListener("click", ()=>{
    Swal.fire({
        title: "Inicia sesión",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Usuario">
          <input type="password" id="swal-input2" class="swal2-input" placeholder="Contraseña">
        `,
        showCloseButton: true,
        confirmButtonText: "Iniciar sesión",
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Buen trabajo!",
                text: "Iniciaste sesión",
                icon: "success",
            });
        }
    });
});
registro.addEventListener("click", ()=>{
    Swal.fire({
        title: "Registrate",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Usuario">
          <input type="password" id="swal-input2" class="swal2-input" placeholder="Contraseña">
        `,
        showCloseButton: true,
        confirmButtonText: "Registrate",
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Buen trabajo!",
                text: "Gracias, por registrarte",
                icon: "success",
            });
        }
    });
});
modal_close.addEventListener('click',(event)=>{
    event.target.parentNode.parentNode.classList.remove('active');
});
carrito.addEventListener('click',(event)=>{
    const id_modal = event.target.getAttribute('data-modal');
    const modal = document.querySelector(id_modal);
    modal.classList.add('active');
});
window.onclick = (event)=>{
    const modal_window = document.querySelector('.modal.active');
    if(event.target == modal){
        modal_window.classList.remove('active');
    }
}
comprar_ahora.addEventListener("click", (event)=>{
    const id_modal_comprar = event.target.getAttribute('data-modal');
    const modal_comprar = document.querySelector(id_modal_comprar);
    modal_comprar.classList.remove('active');
    Swal.fire({
        icon: "success",
        title: "Gracias, por comprar.",
        showConfirmButton: false,
        timer: 2000
    });
});
function mostrar(event,id_compra){
    const child_v = document.getElementById("vendedores");
    while (child_v.firstChild) {
        child_v.removeChild(child_v.firstChild);
    }
    fetch("./user.json")
    .then((response) => response.json())
    .then((data) => {
        const usuarios = data.alquiler_auto;
                const mostrar_id = parseInt(event.target.getAttribute("data-mostrar-id"));
                const vendedores = usuarios.find(user => user.id_auto === mostrar_id);
                const bloque = document.getElementsByClassName("vendedor");
                if (vendedores && bloque.length == 0) {
                    vendedores.user.forEach(vendedor =>{
                        const vendedores = document.getElementById("vendedores");
                        const user_container = document.createElement("div");
                        user_container.classList.add("vendedor");
                        user_container.innerHTML = `
                                <img src="${vendedor.img}">
                                <div class="v_contenido">
                                    <h3>${vendedor.nombre}</h3>
                                    <h3>$${vendedor.precio},000</h3>
                                </div>
                                <button class="btn_vendedor" id="btn_vendedor" onclick="agregar(event,${id_compra})" vendedor="${vendedor.id_user}">Comprar</button>
                        `;
                        vendedores.appendChild(user_container);
                    });
                }
    })
}
const precio = () => {
    i=0;
    let precio_total = 0;
    let product_total = JSON.parse(localStorage.getItem('carrito'));
    product_total.forEach(() => {
        dato_cart = product_total[i];
        precio_total += Number(dato_cart.precio);
        i++;
    });
    const precio_sub = document.getElementById("precio_sub");
    const total = document.getElementById("precio_total");
    precio_sub.textContent = `$${precio_total},000`;
    total.textContent = `$${precio_total},000`;
    const ctd = document.getElementById("ctd");
    ctd.textContent = i;
}
const eliminar = (id_product) => {
    let indice = cliente_total.findIndex(dato => dato.id_user === id_product); // obtenemos el indice
    cliente_total.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(cliente_total));
    let ver_product = JSON.parse(localStorage.getItem('carrito'));
    i=0;
    const child = document.getElementById("modal_list");
    while (child.firstChild) {
        child.removeChild(child.firstChild);
    }
    ver_product.forEach(() => {
        dato_cart = ver_product[i];
        const body_cart = document.getElementById("modal_list");
        const cart_container = document.createElement("div");
        cart_container.classList.add("modal_item");
        cart_container.innerHTML = `
                <div class="modal_thumb">
                    <img src="${dato_cart.img}">
                </div>
                <div class="modal_text-product">
                    <p>${dato_cart.nombre}</p>
                    <p><strong>$${dato_cart.precio},000</strong></p>
                </div>
                <button onclick="eliminar(${dato_cart.id_user})" class="eliminar_product">Eliminar</button>
        `;
        body_cart.appendChild(cart_container);

        i++;
    });
    precio();
}
let cliente_total = [];
const save_product = (cliente) => { 
    cliente_total.push(cliente);
    localStorage.setItem('carrito', JSON.stringify(cliente_total));
    let ver_product = JSON.parse(localStorage.getItem('carrito'));
    i=0;
    const child = document.getElementById("modal_list");
    while (child.firstChild) {
        child.removeChild(child.firstChild);
    }
    ver_product.forEach(() => {
        dato_cart = ver_product[i];
        const body_cart = document.getElementById("modal_list");
        const cart_container = document.createElement("div");
        cart_container.classList.add("modal_item");
        cart_container.innerHTML = `
                <div class="modal_thumb">
                    <img src="${dato_cart.img}">
                </div>
                <div class="modal_text-product">
                    <p>${dato_cart.nombre}</p>
                    <p><strong>$${dato_cart.precio},000</strong></p>
                </div>
                <button onclick="eliminar(${dato_cart.id_user})" class="eliminar_product">Eliminar</button>
        `;
        body_cart.appendChild(cart_container);

        i++;
    });
    const id_modal = "#modal";
    const modal = document.querySelector(id_modal);
    modal.classList.add('active');
    precio();
};
function agregar(event,id_automovil){
    const vendedor_id = event.target.getAttribute("vendedor");
    fetch("./user.json")
    .then((response) => response.json())
    .then((data) => {
        const usuarios = data.alquiler_auto;
        const vendedores_auto = usuarios.find(user => user.id_auto === id_automovil);
        const vendedores = vendedores_auto.user;
        const vendedor = vendedores.find(vende => vende.id_user === Number(vendedor_id));
        save_product(vendedor);
    });
}