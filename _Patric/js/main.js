var myWorld = document.getElementById("world");

var lvl_one_map = [
    { name: "floor", height: 200, width: 200, posX: 0, posY: 100, posZ: 0, rotX: 90, rotY: 0, rotZ: 0, color: "violet", opacity: 0.3 },
    { name: "ceiling", height: 200, width: 200, posX: 0, posY: -100, posZ: 0, rotX: 90, rotY: 0, rotZ: 0, color: "green", opacity: 0.3 },
    { name: "right wall", height: 200, width: 200, posX: 100, posY: 0, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, color: "blue", opacity: 0.3 },
    { name: "left wall", height: 200, width: 200, posX: -100, posY: 0, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, color: "orange", opacity: 0.3 },
    { name: "front wall", height: 200, width: 200, posX: 0, posY: 0, posZ: 100, rotX: 0, rotY: 0, rotZ: 0, color: "#ecc0d1", opacity: 0.3 },
    { name: "hinter wall", height: 200, width: 200, posX: 0, posY: 0, posZ: 100, rotX: 0, rotY: 0, rotZ: 0, color: "yellow", opacity: 0.3 },
];

function createWorld(map) {
    for (let i = 0; i < map.length; i++) {
        var mySquare = document.createElement("div");
        mySquare.id = map[i].name;
        mySquare.style.position = "absolute";
        mySquare.style.height = `${map[i].height}px`;
        mySquare.style.width = `${map[i].width}px`;
        mySquare.style.backgroundColor = map[i].color;
        mySquare.style.opacity = map[i].opacity;
        mySquare.style.transform = `
            translate3d(
                ${map[i].posX + myWorld.clientWidth / 2 - map[i].width / 2}px, 
                ${map[i].posY + myWorld.clientHeight / 2 - map[i].height / 2}px, 
                ${map[i].posZ}px
            ) 
            RotateX(${map[i].rotX}deg) 
            RotateY(${map[i].rotY}deg) 
            RotateZ(${map[i].rotZ}deg)
        `;
        myWorld.appendChild(mySquare);
    }
}

createWorld(lvl_one_map);

let dz = 0;
let vel = 0;

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyW") {
        vel = 10;
    }
    if (e.code == "KeyS") {
        vel = -10;
    }
});

document.addEventListener("keyup", (e) => {
    vel = 0;
});

function update() {
    myWorld.style.transform = `translate3d(${0}px, ${0}px, ${dz}px)`;
    dz += vel;
}

var game = setInterval(update, 100);