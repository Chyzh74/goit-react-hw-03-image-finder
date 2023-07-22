const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35460498-2829e60f1755bf2084387bda6';

export async function galleryApi({ value, page, perPage}) {
  const response = await fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  if (response.ok) {
      return response.json();
      // console.log(response.ok)
  } else {
    throw new Error(`Smth went wrong...`);
  }
}