"use client"
import { Product } from "@/app/components/Card"
import Image from "next/image"
import { Trash } from 'lucide-react';
import {  useEffect, useState } from "react";
import { RemoveFromCart, AddToCart, SubtractFromCart } from "../lib/globals";



interface InfoCard extends Product{
  handlerCart: Function,

}
export default function InfoCard({coverUrl,desc,id,name,released,qtd,section, value, handlerCart}: InfoCard) {
const [count, setCount] = useState(qtd)


const CartHandler = (e: any, ProductsArr:Product)=>{
  e.preventDefault()
  handlerCart(ProductsArr)
}

useEffect(()=>{
  setCount(count)
},[count])

let product: Product = {
  coverUrl,
  desc,
  id,
  name,
  qtd,
  released,
  section,
  value
}

let Totalvalue = value * count
return(
    <div className="flex p-3 h-[11rem]">
        <div className="flex shadow-[0px_0px_4px_0px_rgba(0,0,0,0.75)] w-[25rem] h-auto">
            <Image src={`/assets/${coverUrl}`} alt={name}
            width={1000}
            height={1000}
            className="w-36 h-30"/>
            <div className="flex flex-col w-[10rem] gap-4 text-black ml-3">
                    <h2>{name}</h2>
                    <p>{count}x</p>
                    <p>R$ {Totalvalue}</p>
            </div>
        
         <div className="flex flex-col gap-3 justify-center ml-20 w-8 mr-3">
            <input className="text-white bg-black cursor-pointer rounded-full p-1 hover:bg-gray-900 "
            onClick={(e) => {
              
              setCount(count + 1)
              AddToCart(product)

              let productsArray = []
              productsArray = JSON.parse(localStorage.getItem("cart") || "{}")
              CartHandler(e, productsArray)
            
            }}
            type="button" value="+" />
            <input 
            onClick={(e) => {
              
              
              if(count !== 1){
                setCount(count -1)
                SubtractFromCart(product)

                let productsArray = []
                productsArray = JSON.parse(localStorage.getItem("cart") || "{}")
                CartHandler(e, productsArray)
              }
              
            }}
            className="text-white bg-black cursor-pointer hover:bg-gray-900 p-1 rounded-full" type="button" value="-" />
            <div className="bg-black flex justify-center items-center p-2 hover:bg-gray-900 rounded-full cursor-pointer"> 
             <button onClick={(e)=>  {
                  RemoveFromCart(product)
                  let productsArray = []
                  productsArray = JSON.parse(localStorage.getItem("cart") || "{}")
                  CartHandler(e, productsArray)
                  

            }}>
                <Trash color="#fff" 
              className="w-4 h-4"/>
              </button>
           </div>
           </div>
         </div>
    </div>
)

}