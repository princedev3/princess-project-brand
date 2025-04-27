"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LoaderCircle, X } from "lucide-react";
import { useCreateProductMutation } from "@/app/apis/_product_index.api";
import { toast } from "sonner";

const CreateProduct = () => {
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const addColor = () => {
    if (!colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
    }
  };

  const removeColor = (colorToRemove: string) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };
  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formdata = new FormData(target);
    formdata.append("colors", JSON.stringify(colors));

    const res = await createProduct(formdata);
    if (res.data.status === 200) {
      toast.success(res.data.message);
      target.reset();
      setColors([]);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="inline-flex w-[48px] h-[48px] rounded-full font-bold text-3xl text-white bg-baseGreen shadow-md shadow-baseGreen hover:bg-baseGreen cursor-pointer items-center justify-center leading-none">
          <span className=""> +</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-600 mb-4">
              Add Product
            </DrawerTitle>
            <div>
              <form onSubmit={handleCreateProduct} className=" grid gap-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="grid gap-y-1">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-normal capitalize"
                    >
                      brand
                    </label>
                    <input
                      type="text"
                      required
                      name="brand"
                      placeholder="add product brand"
                      className="border outline-none h-10 p-1 rounded-md placeholder:text-sm placeholder:text-gray-600 placeholder:font-light"
                    />
                  </div>
                  <div className="grid gap-y-1">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-normal capitalize"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      required
                      name="desc"
                      placeholder="describe your product"
                      className="border outline-none h-10 p-1 rounded-md placeholder:text-sm placeholder:text-gray-600 placeholder:font-light"
                    />
                  </div>
                  <div className="grid gap-y-1">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-normal capitalize"
                    >
                      images
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      multiple
                      name="image"
                      required
                      className="border w-full h-10 outline-none p-1 rounded-md placeholder:text-sm placeholder:text-gray-600 placeholder:font-light"
                    />
                  </div>
                  <div className="grid gap-y-1">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-normal capitalize"
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="border h-10 w-full outline-none p-1 rounded-md placeholder:text-sm placeholder:text-gray-600 placeholder:font-light"
                    />
                  </div>
                  <div className="grid gap-y-1">
                    <label htmlFor="">Price</label>
                    <input
                      required
                      name="price"
                      type="number"
                      className="border h-10 w-full outline-none p-1 rounded-md placeholder:text-sm placeholder:text-gray-600 placeholder:font-light"
                    />
                  </div>
                  <div className="grid gap-y-1">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-normal capitalize"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      className="border h-10 w-full outline-none p-1 rounded-md placeholder:text-sm placeholder:text-gray-600 placeholder:font-light"
                    />
                  </div>
                  <div className="grid gap-y-1">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-normal capitalize"
                    >
                      sizes
                    </label>
                    <div className="">
                      <input
                        type="text"
                        required
                        name="size"
                        className="border h-10 w-full outline-none p-1 rounded-md placeholder:text-sm placeholder:text-gray-600 placeholder:font-light"
                      />
                      <div className="text-sm font-light text-gray-500">
                        <span className="text-red-700 text-sm">NOTE:</span>{" "}
                        seperate each value with a ,
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-y-1">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-normal capitalize"
                    >
                      colors
                    </label>
                    <div className="grid gap-3">
                      <div className="grid grid-cols-[auto,1fr] gap-2">
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
                          className="px-3 w-full h-[38px]  rounded-md"
                        >
                          Add color
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 p-1 border rounded-md"
                            style={{ backgroundColor: color }}
                          >
                            <span
                              className="w-6 h-6 rounded-md"
                              style={{ backgroundColor: color }}
                            />
                            <button
                              type="button"
                              onClick={() => removeColor(color)}
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant={"default"}
                  className="px-3 w-full disabled:cursor-not-allowed disabled:bg-baseGreen/80 h-[38px] bg-baseGreen hover:bg-baseGreen rounded-md flex items-center justify-center"
                >
                  {isLoading ? (
                    <LoaderCircle
                      className="animate-spin text-white"
                      size={24}
                    />
                  ) : (
                    "create"
                  )}
                </Button>
              </form>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateProduct;
