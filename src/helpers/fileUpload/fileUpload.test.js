import { fileUpload } from "./fileUpload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "raulangelj",
  api_key: "179162883242369",
  api_secret: "6iFev5CZlo5Fwnuyp1OCSZJsXcA",
  secure: true,
});

describe("Tests on fileUpload", () => {
  const folderName = 'journal-app/'
  const imageUrl =
    "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png";
  test("Should upload the file succesfully", async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], "image.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");
    const cloudResponse = await cloudinary.api.delete_resources([folderName + imageId], { resource_type: "image" });
  });

  test("should return null if upload fail", async () => {
    const file = new File([], "image.png");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
