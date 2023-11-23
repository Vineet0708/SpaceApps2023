import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js'

// defining the scene 
// setting camera to screen size and being able to zoom in/out
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000 )

//rendering the object
const renderer = new THREE.WebGLRenderer(

  )


console.log(scene)
console.log(camera)
console.log(renderer)

//setting the size and ratios of the background
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

//creating the spehere
const geometry = new THREE.SphereGeometry(3,256,128)
const sphere = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({color: 0x0000FF}))


console.log(sphere)
scene.add(sphere)
//setting the camera position
camera.position.z = 10

//creating a plane mesh
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10,20,20),  
  new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide, flatShading: THREE.FlatShading}))

scene.add(plane)

//random number function
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


console.log(sphere.geometry.attributes.position.array)
const array = sphere.geometry.attributes.position.array

for (let i=3; i <array.length; i+=3){
  const x = array[i]
  const y = array[i+1]
  const z = array[i+2]
  console.log(array[i])
  //array[i] = x + getRandomArbitrary(0.1,1)
  //array[i+1] = y + getRandomArbitrary(1,1)
  array[i+2] = z + getRandomArbitrary(0.02,.1)
}



const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
scene.add( line );

//creating the light 
const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1)
DirectionalLight.position.set(0,0,1)
scene.add(DirectionalLight)

//creating a function for the animation of the globe
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
   sphere.rotation.x+=.01
   sphere.rotation.y+=.01
   line.rotation.x+=.01
   line.rotation.y+=0.01
  //plane.rotation.x+=.01
  //plane.rotation.y+=.01
}

animate()
