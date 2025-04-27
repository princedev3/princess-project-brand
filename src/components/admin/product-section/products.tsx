import React from "react";
import { Button } from "../../ui/button";
import AdminProductCard from "./admin-product-card";
import { Plus, Search } from "lucide-react";
import CreateProduct from "./create-product";

const Products = () => {
  return (
    <div>
      <div className="grid gap-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex-1">
            <form
              action=""
              className="flex h-[48px] items-center border rounded-md bg-gray-100"
            >
              <input
                type="text"
                placeholder="Search product by name"
                className="border-none w-full outline-none text-lg p-2 text-gray-600 rounded-l-md placeholder:text-sm"
              />
              <button className="h-full px-2">
                <Search className="text-gray-600" />
              </button>
            </form>
          </div>

          <CreateProduct />
        </div>
        <AdminProductCard />
      </div>
    </div>
  );
};

export default Products;
