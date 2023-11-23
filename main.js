import gsap from 'gsap'
import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js'
import vertexShader from './shaders/vertex.glsl' 
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000 )

//rendering the object
const renderer = new THREE.WebGLRenderer(
  {
  antialias: true,
})

renderer.setSize(innerWidth , innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)

const geometry = new THREE.SphereGeometry(5,256,128)
const sphere = new THREE.Mesh(
  geometry,
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,  
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./globe/Bake9.png')
      }
    }
  }))

scene.add(sphere)


const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,256,128),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)

atmosphere.scale.set(1.1,1.1,1.1)

scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})  

const starVerticies = []

for (let i=0; i<10000; i++){
  const x = (Math.random()-0.5)*2000
  const y = (Math.random()-0.5)*2000
  const z = -(Math.random())*2000
  starVerticies.push(x,y,z)
}
console.log(starVerticies)

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVerticies, 3))
const stars = new THREE.Points(
  starGeometry, starMaterial)

scene.add(stars)

camera.position.z = 15 

const mouse = {
  x: undefined,
  y: undefined
}

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  sphere.rotation.y +=0.001,
  sphere.rotation.x +=0.0001

  gsap.to(group.rotation, {
    x: mouse.y * 5,
    y: mouse.x * 5,
    duration: 2
  })
}

animate()

addEventListener('mousemove', () => {
  mouse.x = (event.clientX/innerWidth)*2-1
  mouse.y =(event.clientY / innerHeight)*2-1
  console.log(mouse)
})

