import styles from "./index.module.css";
import { useState, useEffect } from 'react';

type Image64DisplayProps = {
  base64_image: string
  alt?: string
  width?: string
  height?: string
}

const Image64Display = ({ base64_image, alt="", width="-1", height="-1"}: Image64DisplayProps) => {
  // Variaveis:
  const [imageUrl, setImageUrl] = useState("");

  const imageStyle = {
    "--width": width,
    "--height": height,
  } as React.CSSProperties

  // Funcoes:
  function convertBase64ImageToJpegUrl(base64Image: string) {
    try {
      // Converte imagem em binario:
      const imageBinary = atob(base64Image)
      var byteArray : number[] = [];
      for (let i = 0; i < imageBinary.length; i++) {
          byteArray.push(imageBinary.charCodeAt(i));
      }
      let blob = new Blob([new Uint8Array(byteArray)], { type: 'image/jpeg' })
  
      // Cria uma URL temporária para a imagem
      const tempImageUrl = URL.createObjectURL(blob);
  
      // Cria um objeto de imagem
      const image = new Image();
      image.src = tempImageUrl;
      image.onload = () => { 
        // Quando imagem for carregada:
        
        // Cria um canvas para exibir a imagem:
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') // Cotexto de renderização do canvas
        if (ctx) {
          // Define o tamanho do canvas para as da imagem
          canvas.width = image.width;
          canvas.height = image.height;
          // Desenha a imagem no canvas
          ctx.drawImage(image, 0, 0);
  
          // Converte o canvas para JPEG e obtém a URL
          const jpegUrl = canvas.toDataURL('image/jpeg');
          setImageUrl(jpegUrl)
        } else {
          throw new Error('Erro ao obter contexto do canvas.')
        }
      }
    } catch (error) {
      console.error('Erro ao converter imagem:', error)
    }
  }

  useEffect(() => {
    convertBase64ImageToJpegUrl(base64_image)
  }, [base64_image])

  return (
    <img className={styles.image} src={imageUrl} alt={alt} style={imageStyle} />
  );
};

export default Image64Display;