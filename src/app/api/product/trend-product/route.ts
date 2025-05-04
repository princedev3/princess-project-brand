import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET= async(req:NextRequest)=>{
    try {
        const allTrendProduct = await prisma.product.findMany({
            orderBy:{
                createAt:"desc"
            },
            take:3
        })
        return NextResponse.json({message:allTrendProduct,status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"can not get trending product",status:500})
    }
}