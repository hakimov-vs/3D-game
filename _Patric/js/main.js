var myWorld = document.getElementById("world");

var lvl_one_map = [
    { name: "floor", height: 2000, width: 2000, posX: 0, posY: 100, posZ: 0, rotX: 90, rotY: 0, rotZ: 0, color: "violet", opacity: 0.3 },
    { name: "ceiling", height: 2000, width: 2000, posX: 0, posY: -100, posZ: 0, rotX: 90, rotY: 0, rotZ: 0, color: "green", opacity: 0.3 },
    { name: "right wall", height: 200, width: 2000, posX: 1000, posY: 0, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, color: "blue", opacity: 0.3 },
    { name: "left wall", height: 200, width: 2000, posX: -1000, posY: 0, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, color: "orange", opacity: 0.3 },
    { name: "front wall", height: 200, width: 2000, posX: 0, posY: 0, posZ: 1000, rotX: 0, rotY: 0, rotZ: 0, color: "#ecc0d1", opacity: 0.3 },
    { name: "hinter wall", height: 200, width: 2000, posX: 0, posY: 0, posZ: 1000, rotX: 0, rotY: 0, rotZ: 0, color: "yellow", opacity: 0.3 },
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

let dx = dz = 0;
let pressUp = pressDown = pressLeft = pressRight = 0;
let vel = 0;

function player(x, y, z, vx, vy, vz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
}

let pawn = new player(0, 0, 0, 10, 10, 10);

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyW") {
        pressUp = pawn.vz;
    }
    if (e.code == "KeyS") {
        pressDown = pawn.vz;
    }
    if (e.code == "KeyD") {
        pressLeft = pawn.vx;
    }
    if (e.code == "KeyA") {
        pressRight = pawn.vx;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code == "KeyW") {
        pressUp = 0;
    }
    if (e.code == "KeyS") {
        pressDown = 0;
    }
        if (e.code == "KeyD") {
        pressLeft = 0;
    }
    if (e.code == "KeyA") {
        pressRight = 0;
    }
});

function update() {
    dz = pressUp - pressDown;
    dx = pressLeft - pressRight;

    pawn.z += dz;
    pawn.x += dx;

    myWorld.style.transform = `translate3d(${-pawn.x}px, ${pawn.y}px, ${600 + pawn.z}px)`;
}

var game = setInterval(update, 10);