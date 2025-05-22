"use client";
import React, { useEffect, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ratings } from "@/static-data/staticdata";
import { Heart, LoaderCircle, Share2, Trash } from "lucide-react";
import {
  useCreateCommentMutation,
  useGetAllCommentQuery,
} from "@/app/apis/_comment_index_api";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { userStore } from "@/static-data/user-session";
import StarRating from "./comment-section/star-rating";
import ListComment from "./comment-section/list-comment";
import { CreatedComment } from "@/static-data/types";

const ProductReviews = ({ id ,commentData}: { id: string,commentData: {
    createdComment: CreatedComment[];
    averageRating: number;
} }) => {

  const session = userStore((state) => state.session);
  const [message, setMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const [createComment, { isLoading: isCreatingComment }] =
    useCreateCommentMutation();
  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setEmojiOpen(false);
      }
    };

    if (emojiOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiOpen]);
  const handleCreateReview = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formdata = new FormData(target);
      const rating = formdata.get("rating");
      const res = await createComment({
        rating,
        message,
        userId: session?.user?.id,
        productId: id,
      });
      if (res?.data?.status === 200) {
        target.reset();
        setMessage("");
        toast.success(res?.data?.message);
        return;
      }
      toast.error(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="mb-[50px] grid gap-y-10">
      <div className="grid  gap-5 gap-y-5 ">
        

        <div className="grid gap-y-4 self-start">
          <form onSubmit={handleCreateReview} className="">
            <div className="grid gap-y-2 mt-4 mb-2">
              <h1 className="text-xl font-semibold">ADD A REVIEW</h1>
              <span className="text-gray-700 text-lg">
                Your email address will not be published. Require fields are
                marked<b className="text-red-600">*</b>
              </span>
              <div className="flex items-center">
                <span className="text-gray-700 text-lg">
                  You rating of this product
                </span>
                <Star className="w-4 h-4 text-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] border rounded-md shadow  ">
              <Textarea
                required
                cols={7}
                placeholder="write your review*"
                value={message}
                className="!border-none !focus:ring-0 !focus:outline-none !shadow-none !outline-0 focus:border-none !focus:ring-0 !focus:outline-none  resize-none"
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="relative h-full">
                <button
                  type="button"
                  className="bg-gray-50 cursor-pointer w-[50px] md:w-[100px] h-full"
                  onClick={() => setEmojiOpen(!emojiOpen)}
                >
                  😊
                </button>
                {emojiOpen && (
                  <div
                    ref={pickerRef}
                    className="absolute top-full right-0 z-50"
                  >
                    <Picker
                      data={emojiData}
                      onEmojiSelect={handleEmojiSelect}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <Select required name="rating">
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Rating*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">One</SelectItem>
                  <SelectItem value="2">Two</SelectItem>
                  <SelectItem value="3">Three</SelectItem>
                  <SelectItem value="4">Four</SelectItem>
                  <SelectItem value="5">Five</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="bg-black text-lg font-semibold  py-6"
              >
                {isCreatingComment ? (
                  <LoaderCircle
                    className="animate-spin grid mx-auto"
                    color="white"
                    size={22}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="grid gap-y-7">
        <div className="bg-[#FFFBF5] h-[75px] pl-[24px] text-2xl flex items-center ">
          {commentData && (commentData.createdComment.length as number)} Review
          For This Product
        </div>

        <ListComment
          commentData={commentData && commentData?.createdComment}
        />
      </div>
    </div>
  );
};

export default ProductReviews;
