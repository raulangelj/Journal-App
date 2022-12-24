export const fileUpload = async (file) => {
  if (!file) throw new Error("No file was found");
  const cloudUrl = "https://api.cloudinary.com/v1_1/raulangelj/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const response = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Image was not able to uploaded");
    const cloudResponse = await response.json();
    return cloudResponse.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading file", error.message);
  }
};
