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
import LoadingPage from "@/components/navbar/loading";

const formSchema = z.object({
  search: z.string().optional(),
});

const sanitizeQuery = (value: string) => decodeURIComponent(value.trim());

export default function ProductSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const urlSearch = sanitizeQuery(searchParams.get("search") || "");
  const urlBrand = sanitizeQuery(searchParams.get("brand") || "");

  const [query, setQuery] = useState(urlSearch);
  const [selectCat, setSelectCat] = useState(urlBrand);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const productSet = useRef(new Set());

  const finalQuery = query || (selectCat !== "all" ? selectCat : "");

  const { data, isLoading } = useGetSearchProductQuery({ page, query: finalQuery });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: urlSearch },
  });

  useEffect(() => {
    if (!data || !data.message) return;
  
  
    if (page === 1) {
      productSet.current.clear();
      setAllProducts([]);
    }
  
    const fetched = data.message.allProducts || [];
  
    if (fetched.length === 0 && !query && !selectCat) return;
  
    const newProducts = fetched.filter(
      (item) => !productSet.current.has(item.id)
    );
  
    if (newProducts.length > 0) {
      setAllProducts((prev) => {
        const updated = [...prev, ...newProducts];
        newProducts.forEach((item) => productSet.current.add(item.id));
        return updated;
      });
    }
  
    setHasMore(data.message.count > allProducts.length + newProducts.length);
  }, [data, finalQuery, page]);
  

 

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newSearch = values.search?.trim() || "";
    if (newSearch !== query) {
      setQuery(newSearch);
      setSelectCat("all");
      updateUrl({ search: newSearch });
    }
  };

  const handleBrandSelect = (newBrand: string) => {
    if (newBrand !== selectCat) {
      setSelectCat(newBrand);
      setQuery("");
      form.setValue("search", "");
      updateUrl({ brand: newBrand });
    }
  };

  const updateUrl = (params: { search?: string; brand?: string }) => {
    const url = new URLSearchParams();
    if (params.search) url.set("search", params.search);
    if (params.brand) url.set("brand", params.brand);
    router.push(`${pathName}?${url.toString()}`, { scroll: false });
  
    setPage(1);
    setAllProducts([]);
    productSet.current.clear(); 
    setHasMore(true);
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        updateUrl({ search: query.trim() });
      }
    }, 500); 
  
    return () => clearTimeout(timeout);
  }, [query]);
  const fetchMoreData = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  setQuery(val);
  form.setValue("search", val);

  if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
  }

  debounceTimeout.current = setTimeout(() => {
    updateUrl({ search: val.trim() });
  }, 500);
};


  if (isLoading && page === 1) return <LoadingPage />;

  return (
    <div className="mb-5 px-3">
      <h1 className="text-3xl font-semibold my-10 text-center">Our Products</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-[1fr,auto] my-4 border rounded-2xl h-[60px] bg-[#FFFBF5]"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="rounded-none border-none h-full"
                    placeholder="Search product"
                    {...field}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Select value={selectCat} onValueChange={handleBrandSelect}>
            <SelectTrigger className="w-[180px] h-full rounded-2xl border-gray-200">
              <SelectValue placeholder="Search by brand" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto w-[220px]">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cap">Cap</SelectItem>
              <SelectItem value="shoe">Shoe</SelectItem>
              <SelectItem value="glass">Glass</SelectItem>
              {/* Add more categories if needed */}
            </SelectContent>
          </Select>
        </form>
      </Form>

      {selectCat === "all" ? null : (
        <div className="mb-4">
          {data?.message.isFallback && (
            <p className="text-sm text-gray-600">
              No results found for{" "}
              {query ? (
                <>
                  search <strong>{query}</strong>
                </>
              ) : (
                <>
                  brand <strong>{selectCat}</strong>
                </>
              )}
              . Showing popular products instead.
            </p>
          )}
        </div>
      )}

      <InfiniteScroll
        scrollThreshold={0.6}
        dataLength={allProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingPage />}
        endMessage={
          <p className="text-center text-gray-700 font-semibold text-lg mt-4">
            <b>No Product Left</b>
          </p>
        }
        className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5"
      >
        {allProducts.map((item) => (
          <SingleCard key={item.id} {...item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
