const canvas = document.querySelector('canvas'); // Replace with your canvas element

// Check if the browser supports WebGL
if (!canvas) {
    console.error('Canvas element not found.');
} else {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    // Check if WebGL is available
    if (!gl) {
        console.error('WebGL not supported.');
    } else {
        // WebGL is supported; you can access WebGL context properties and extensions here.
        console.log('WebGL supported.');

        // Check WebGL version
        const webglVersion = gl.getParameter(gl.VERSION);
        console.log('WebGL Version:', webglVersion);

        // Check WebGL shading language version
        const shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
        console.log('Shading Language Version:', shadingLanguageVersion);

        // Check available extensions
        const extensions = gl.getSupportedExtensions();
        console.log('Supported WebGL Extensions:', extensions);
    }
}
