import axios from 'axios';


export const uploadAndGenerate3D = async (imageUri: string): Promise<string | null> => {
  //  try {
  //   // 1. Convertir le fichier local en buffer/base64 ou l’uploader sur un serveur public, sinon utiliser le champ 'file' de FormData
  //   const formData = new FormData();
  //   formData.append('data', {
  //     uri: imageUri,
  //     type: 'image/jpeg',
  //     name: 'photo.jpg',
  //   } as any);

  //   // POST pour démarrer le job Gradio (attention : endpoint spécifique !)
  //   const postResp = await axios.post(
  //     'https://leonelhs-pifuhd.hf.space/gradio_api/call/predict',
  //     formData,
  //     {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     }
  //   );

  //   // 2. Récupérer l'event_id dans la réponse
  //   const eventId = postResp.data?.event_id || postResp.data?.data || postResp.data?.[0]; // Adapter selon la réponse
  //   if (!eventId) throw new Error('event_id non trouvé dans la réponse Gradio');

  //   // 3. GET pour obtenir le résultat (avec un délai, le temps du calcul)
  //   // Option 1 : boucle d'attente active (polling)
  //   let modelUrl = null;
  //   let status = null;
  //   let attempts = 0;
  //   while (!modelUrl && attempts < 20) { // Max 20 essais (~20s)
  //     await new Promise((r) => setTimeout(r, 1000)); // attendre 1s entre chaque essai
  //     const getResp = await axios.get(
  //       `https://leonelhs-pifuhd.hf.space/gradio_api/call/predict/${eventId}`
  //     );
  //     status = getResp.data?.status || getResp.data?.["status"];
  //     // Cherche la clé de sortie (adapte selon la réponse du Space)
  //     const outputs = getResp.data?.data || getResp.data;
  //     // Souvent outputs[1] est l’url du .obj
  //     if (Array.isArray(outputs) && outputs[1]) { 
  //       modelUrl = outputs[1]?.url || outputs[1]?.path || outputs[1];
  //     }
  //     attempts++;
  //   }
  //   if (!modelUrl){ throw new Error('Aucun modèle généré ou délai dépassé.');}
  //   return modelUrl;
  // } catch (error) {
  //   console.error('Erreur Gradio queue:', error);
  //   return null;
  // }
  // // const formData = new FormData();
  // // formData.append('image', {
  // //   uri: imageUri,
  // //   type: 'image/jpeg',
  // //   name: 'photo.jpg',
  // // } as any);

  // // try {
  // //   // On attend un fichier .obj (stream de données) en retour, donc responseType: 'blob'
  // //   const response = await axios.post(
  // //     'https://huggingface.co/spaces/nyse-s/pifuhd-api/predict',
  // //     formData,
  // //     {
  // //       headers: {
  // //         'Content-Type': 'multipart/form-data',
  // //       },
  // //       responseType: 'blob', // très important pour bien récupérer un fichier
  // //     }
  // //   );

  // //   // On retourne le blob (.obj) directement
  // //   return response.data as Blob;
  // // } catch (error: any) {
  // //   console.error('Erreur lors de l'envoi de la photo :', error?.response || error);
  // //   return null;
  // // }
};
