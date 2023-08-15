document.addEventListener("DOMContentLoaded", async () => {
    const startButton = document.getElementById("startButton");
    const video = document.getElementById("video");
  
    startButton.addEventListener("click", async () => {
      try {
        // Solicitar permisos para acceder a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
        // Mostrar el video en la etiqueta <video>
        video.srcObject = stream;
  
        // Crear un objeto MediaRecorder para grabar el video
        const mediaRecorder = new MediaRecorder(stream);
  
        const chunks = [];
  
        // Escuchar eventos de grabación
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
  
        mediaRecorder.onstop = () => {
          // Convertir los fragmentos (chunks) en un archivo de video
          const blob = new Blob(chunks, { type: "video/webm" });
          const videoUrl = URL.createObjectURL(blob);
  
          // Mostrar el video grabado en un elemento de video
          const recordedVideo = document.createElement("video");
          recordedVideo.controls = true;
          recordedVideo.src = videoUrl;
  
          document.body.appendChild(recordedVideo);
        };
  
        // Comenzar a grabar cuando se presione el botón "Comenzar"
        startButton.disabled = true;
        mediaRecorder.start();
  
        // Detener la grabación después de unos segundos (puedes personalizar esto)
        setTimeout(() => {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }, 10000); // Detener después de 10 segundos
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });