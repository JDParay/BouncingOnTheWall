const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Start with red color
const square = new THREE.Mesh(geometry, material);
scene.add(square);

// Initial settings
camera.position.z = 5;
let velocity = getRandomVelocity(); // Get initial random velocity
let scaleFactor = 0.9; // Scale down by 10% each hit
let bounces = 0; // Track the number of bounces
const maxBounces = 9;

// Function to change the square's color randomly
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function getRandomVelocity() {
    const speed = 0.05; 
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    };
}

function animate() {
    requestAnimationFrame(animate);

    square.position.x += velocity.x;
    square.position.y += velocity.y;

    square.rotation.set(0, 0, 0);


    if (square.position.x > 3.5) {
        square.position.x = 3.5; 
        handleBounce(); 
    }
    if (square.position.x < -3.5) {
        square.position.x = -3.5; 
        handleBounce(); 
    }
    if (square.position.y > 3.5) {
        square.position.y = 3.5; 
        handleBounce(); 
    }
    if (square.position.y < -3.5) {
        square.position.y = -3.5; 
        handleBounce(); 
    }

    renderer.render(scene, camera);
}

function handleBounce() {
    // Change color upon hitting the wall
    square.material.color.set(getRandomColor());

    // Scale down the square by 10% after each bounce
    square.scale.x *= scaleFactor;
    square.scale.y *= scaleFactor;

    bounces++;


    if (bounces >= maxBounces) {
        square.visible = false;
    } else {
        let newVelocity;
        do {
            newVelocity = getRandomVelocity();
        } while (Math.sign(newVelocity.x) === Math.sign(velocity.x) && Math.sign(newVelocity.y) === Math.sign(velocity.y));
        
        // Update the velocity with the new direction
        velocity = newVelocity;
    }
}

animate();


const borderGeometry = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(8, 8, 0.1)), 
    new THREE.LineBasicMaterial({ color: 0x0000ff }) 
);
scene.add(borderGeometry);

