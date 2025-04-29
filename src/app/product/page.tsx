"use client";
import React, { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetSearchProductQuery } from "../apis/_product_index.api";
import SingleCard from "@/components/navbar/single-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPage from "@/components/navbar/loading";
import { sanitizeQuery } from "@/static-data/helper-func";

const formSchema = z.object({
  search: z.string(),
});

const Product = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const lastSelectedRef = useRef("");
  const urlQuery = searchParams.get("search") || "";
  const urlBrand = sanitizeQuery(searchParams.get("brand") || "") ;
  const initialQuery =  sanitizeQuery(urlQuery);
  const [query, setQuery] = useState(initialQuery);
  const[selectCat,setSelectCat]=useState(urlBrand)
  const [page, setPage] = useState<number>(1);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const productSet = useRef(new Set());
  const { data, isLoading } = useGetSearchProductQuery({ page, query,brand:selectCat });

  useEffect(() => {
    if (!data?.message.allProducts) return;
    const newProducts = data.message.allProducts.filter(
      (item) => !productSet.current.has(item.id)
    );

    if (newProducts.length > 0) {
      setAllProducts((prev) => {
        const updatedProducts = [...prev, ...newProducts];
        newProducts.forEach((item) => productSet.current.add(item.id));
        return updatedProducts;
      });
    }

    setHasMore(data.message.count > allProducts.length + newProducts.length);
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: initialQuery },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newQuery = values.search.trim();

    if (newQuery !== query) {
      setQuery(newQuery);
      router.push(`${pathName}?search=${encodeURIComponent(newQuery)}`, {
        scroll: false,
      });

      setPage(1);
      setAllProducts([]);
      setHasMore(true);
      productSet.current.clear();
    }
  }

  const fetchMoreData = () => {
    if (!isLoading) {
      setPage((prev) => prev + 1);
    }
  };
 
   const searchValue = form.watch("search") 
  //  const handleSelectChange = (value: string) => {
  //   setSelectCat(value);
  //   setPage(1);
  //   setAllProducts([]);
  //   setHasMore(true);
  //   productSet.current.clear();
  //   router.push(`${pathName}?search=${encodeURIComponent(query)}&brand=${value}`, {
  //     scroll: false,
  //   });
  // };

  // When user types in the search input
useEffect(() => {
  const newQuery = searchValue.trim();

  if (newQuery && newQuery !== query) {
    setQuery(newQuery);
    setSelectCat(""); // reset category because typing overrides select
    setPage(1);
    setAllProducts([]);
    setHasMore(true);
    productSet.current.clear();

    router.push(`${pathName}?search=${encodeURIComponent(newQuery)}`, {
      scroll: false,
    });
  }
}, [searchValue]);

// When user selects a category
useEffect(() => {
  if (selectCat) {
    setQuery(""); // reset search because selecting category overrides input
    setPage(1);
    setAllProducts([]);
    setHasMore(true);
    productSet.current.clear();

    router.push(`${pathName}?brand=${encodeURIComponent(selectCat)}`, {
      scroll: false,
    });
  }
}, [selectCat]);

  // useEffect(() => {
  //   const newQuery = searchValue.trim();
  //   if (newQuery !== query) {
      
  //     setQuery(newQuery);
  //     setPage(1);
  //     setAllProducts([]);
  //     setHasMore(true);
  //     productSet.current.clear();

  //     router.push(`${pathName}?search=${encodeURIComponent(newQuery)}&brand=${selectCat}`, {
  //       scroll: false,
  //     });
  //   }
  // }, [searchValue, query,selectCat]);

  if (isLoading && page === 1) {
    return <LoadingPage />;
  }
  return (
    <div className="mb-5 px-3">
      <h1 className="text-3xl font-semibold my-10 mx-auto w-ful text-center">
        Our Products
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-[1fr,auto] my-4 border rounded-2xl h-[60px] bg-[#FFFBF5] "
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                <Input
  className="rounded-none border-none !outline-none focus:ring-0 active:outline-none active:ring-0 h-full"
  placeholder="Search product"
  {...field}
/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      <Select  value={selectCat}
  onValueChange={ (value) => {
    form.setValue("search", ""),
    setSelectCat(value)
  }}
  >
  <SelectTrigger className="w-[180px] h-full rounded-2xl border-gray-200 !outline-none">
    <SelectValue placeholder={"search by brand"} />
  </SelectTrigger>
  <SelectContent className="max-h-[300px] overflow-y-auto w-[220px]">
  <SelectItem value="cap">cap</SelectItem>
  <SelectItem value="shoe">shoe</SelectItem>
  <SelectItem value="glass">glass</SelectItem>
  {/* add more items here */}
</SelectContent>
</Select>
          
        </form>
      </Form>
      {data?.message.isFallback && (
       <p className="text-sm text-gray-600 mb-4">
       No results found for 
       {urlQuery && (
         <>
           {" search "} <strong>{urlQuery}</strong>
         </>
       )}
       {selectCat && !urlQuery && (
         <>
           {" brand "} <strong>{selectCat}</strong>
         </>
       )}
       . Showing popular products instead.
     </p>
      )}
      <InfiniteScroll
        scrollThreshold={0.6}
        dataLength={allProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="h-[425px] bg-gray-100 p-3 space-y-4">
            <div className="relative h-[180px] bg-white flex items-center justify-center w-full">
              <div className="h-[100px] w-[100px] bg-gray-300 animate-pulse rounded-md"></div>
              <div className="absolute right-2 top-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:right-4 z-20">
                <div className="grid gap-y-[6px]">
                  <div className="h-[35px] w-[35px] bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-[35px] w-[35px] bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute bottom-2 flex gap-2 items-center">
                <div className="h-4 w-4 bg-gray-300 animate-pulse rounded-full"></div>
                <span className="h-4 w-16 bg-gray-300 animate-pulse rounded-md"></span>
              </div>
            </div>

            <div className="w-[70px] h-[70px] mx-auto flex items-center justify-center">
              <div className="h-[30px] w-[70px] bg-gray-300 animate-pulse"></div>
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-[65%] bg-gray-300 animate-pulse rounded-md"></div>
              <div className="flex flex-col items-end space-y-1">
                <div className="h-4 w-12 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-4 w-16 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            </div>

            <div className="h-10 bg-gray-300 animate-pulse rounded-sm"></div>
          </div>
        }
        endMessage={
          <p className="text-center text-gray-700 font-semibold text-lg mt-4">
            <b>No Product Left</b>
          </p>
        }
        className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] h-full  gap-5 !overflow-hidden"
      >
        {allProducts.map((item) => (
          <SingleCard key={item.id} {...item} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Product;
