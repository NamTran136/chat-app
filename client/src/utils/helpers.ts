export const checkIfUrlIsImage = (url: string) => {
  const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const hasImagePattern = imageFormats.some((extension: string) =>
    url.includes(`.${extension}?`)
  );

  // Check if the string ends with a valid extension
  const hasValidExtensionAtEnd = imageFormats.some((extension: string) =>
    url.endsWith(`.${extension}`)
  );

  return hasImagePattern || hasValidExtensionAtEnd;
};
