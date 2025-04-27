"use client";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/app/apis/_product_index.api";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { eyeglassBrands } from "@/static-data/staticdata";
import { toast } from "sonner";
import LoadingPage from "@/components/navbar/loading";

const ProductEditPage = () => {
  const router = useRouter();
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newColorArray, setNewColorArray] = useState<string[]>([]);
  const [newSizeArray, setNewSizeArray] = useState<string[]>([]);
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id as string);
  useEffect(() => {
    setNewImages(data?.getSingleFetch.images as string[]);
    setNewColorArray(data?.getSingleFetch.colors as string[]);
    setNewSizeArray(data?.getSingleFetch.sizes as string[]);
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleDeleteImage = (img: string) => {
    const newImageList = newImages.filter((item) => item !== img);
    setNewImages(newImageList);
  };
  const handleDeleteColor = (deletedColor: string) => {
    const newColorList = newColorArray.filter((item) => item !== deletedColor);
    setNewColorArray(newColorList);
  };
  const handleDeleteSize = (deletedSize: string) => {
    const newSizeList = newSizeArray.filter((item) => item !== deletedSize);
    setNewSizeArray(newSizeList);
  };
  const addColor = () => {
    if (!newColorArray.includes(selectedColor)) {
      setNewColorArray([...newColorArray, selectedColor]);
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formdata = new FormData(target);
      formdata.append("newColor", JSON.stringify(newColorArray));
      formdata.append("newImage", JSON.stringify(newImages));
      formdata.append("id", JSON.stringify(id));
      formdata.append("newSize", JSON.stringify(newSizeArray));
      const res = await updateProduct(formdata);
      if (res.data.status === 200) {
        target.reset();
        toast.success(res.data.message);
        router.push("/admin");
        return;
      }
      toast.error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="p-3">
        <form onSubmit={handleFormSubmit} className="grid gap-y-5">
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">desc</label>
            <textarea
              id="desc"
              name="desc"
              defaultValue={data?.getSingleFetch.desc}
              className="w-full p-2 rounded-md border text-gray-700 resize-none"
            />
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">name</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={data?.getSingleFetch.name}
              className="w-full p-2 rounded-md border text-gray-700 "
            />
          </div>

          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">Price</label>
            <input
              name="price"
              id="price"
              type="number"
              defaultValue={data?.getSingleFetch.price}
              className="  p-2 rounded-md border text-gray-70 w-full  "
            />
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">Quanity</label>
            <input
              name="quantity"
              id="quantity"
              type="number"
              defaultValue={data?.getSingleFetch.quantity}
              className="  p-2 rounded-md border text-gray-70 w-full  "
            />
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">Brand</label>
            <Select name="brand">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select brand" />
              </SelectTrigger>
              <SelectContent>
                {eyeglassBrands.map((item) => (
                  <SelectItem
                    defaultValue={data?.getSingleFetch.brand as string}
                    value={item}
                    key={item}
                  >
                    {item}{" "}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">Colors</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-10 h-10 cursor-pointer border rounded-md"
              />
              <Button
                type="button"
                variant={"outline"}
                onClick={addColor}
                className="px-3 w-full   rounded-md"
              >
                Add color
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {newColorArray &&
                newColorArray.length > 0 &&
                newColorArray.map((bgColor, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: bgColor }}
                    className="w-5 h-5 rounded-sm cursor-pointer relative group"
                  >
                    <X
                      size={18}
                      className="hidden group-hover:block text-red-600 absolute -top-2 -right-2 z-10"
                      onClick={() => handleDeleteColor(bgColor)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">Sizes</label>
            <div className="w-full">
              <input
                name="size"
                id="size"
                type="text"
                className="p-2 rounded-md border text-gray-700 w-full"
              />
              <span className="text-[12px] text-gray-600">
                <b className="text-red-600">Note</b> :seperate each value with
                a,{" "}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {newSizeArray &&
                newSizeArray.length > 0 &&
                newSizeArray.map((eachSize, index) => (
                  <div
                    key={index}
                    className="border p-1  text-center w-10 rounded-sm cursor-pointer relative group"
                  >
                    {eachSize}{" "}
                    <X
                      onClick={() => handleDeleteSize(eachSize)}
                      size={18}
                      className="hidden group-hover:block text-red-600 absolute -top-2 -right-2 z-10"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="grid gap-y-4">
            <label className="capitalize text-xl text-gray-700">Images</label>
            <input
              multiple
              name="image"
              id="image"
              accept="image/*"
              type="file"
              className="p-2 rounded-md border text-gray-700 w-full"
            />
            <div className="flex items-center gap-3">
              {newImages &&
                newImages.length > 0 &&
                newImages?.map((img, index) => (
                  <div
                    key={index}
                    className="relative h-[120px] w-[120px] group"
                  >
                    <Image
                      src={img}
                      fill
                      alt={`Product-${index}`}
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                    <X
                      className="hidden group-hover:block text-red-600 absolute top-0 right-2 z-10"
                      onClick={() => handleDeleteImage(img)}
                    />
                  </div>
                ))}
            </div>
            <Button
              disabled={isUpdateLoading}
              className="bg-baseGreen !py-5 cursor-pointer capitalize text-xl hover:bg-baseGreen/80"
            >
              {isUpdateLoading ? (
                <LoaderCircle className="animate-spin text-center" size={25} />
              ) : (
                "save changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
