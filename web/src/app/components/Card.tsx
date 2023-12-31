import Image from 'next/image'
import { ShoppingCart, ArrowRight} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { Toast } from '../lib/swall';

export interface Product{
    id:string
    name: string,
    desc: string,
    value: number,
    coverUrl: string,
    qtd: number,
    section: string,
    released: boolean
}
export const saveProduct = (product : Product)=>{
    let arrProducts : Product[] = [] 
    const newProduct: Product = {
        id: product.id,
        coverUrl: product.coverUrl,
        name: product.name,
        desc:product.desc,
        value: product.value,
        qtd: product.qtd,
        section: product.section,
        released: product.released
    }   

    if(localStorage.getItem("cart")){
       
       arrProducts = JSON.parse(localStorage.getItem("cart") || "{}")

        if(arrProducts.find(product => product.name === newProduct.name)){
            arrProducts.map((product) =>{
                if(product.name === newProduct.name){
                    product.qtd += 1
                }
                
            })
            localStorage.setItem("cart", JSON.stringify(arrProducts))
        }else{
            arrProducts.push(newProduct)
            localStorage.setItem("cart", JSON.stringify(arrProducts))     
        }
            
        
    }else{
       arrProducts.push(newProduct)
       localStorage.setItem("cart", JSON.stringify(arrProducts))
    }
}
export  function setProductId(id: string, router: AppRouterInstance){
    localStorage.setItem('id', id)
    router.push('/ProductPage')
}
export function Card(product: Product) {
 
      
    const router = useRouter()
    return(
        <div className={ `bg-white text-black flex flex-col gap-3 mt-5 ${product.section}` } 
        data-translate='0' >
               <div className='flex justify-center items-center flex-col gap-2 h-[20rem] overflow-hidden  w-[15rem]'>
                    <div className='h-[17rem] mt-3 w-[13rem] overflow-hidden rounded-[0.5rem]'>
                        <Image src={`/assets/${product.coverUrl}`}
                            width={500}
                            height={234}
                            alt={product.coverUrl} 
                            draggable="false"
                            className=' h-[17rem] w-[15rem] object-cover cursor-pointer ease-linear overflow-hidden hover:scale-[1.2] hover:transition duration-1000  '
                            onClick={() => setProductId(product.id, router)}
                           />

                    </div>
                       <h2>{product.name}</h2>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col justify-center items-center'>
                        
                        <ShoppingCart onClick={() =>{ 
                            Toast.fire({
                                icon: "success",
                                title: "Item adicionado ao carrinho"
                            })
                            saveProduct(product)} 
                            } className='cursor-pointer'/>
                            
                        {!product.released && <p className='font-extrabold'>Pré-venda</p>}
                    </div>
                    <div className='flex justify-between p-2'>
                        <div>
                            <h3 className='price'>Valor</h3>
                            <h3 className='price unity'>R$ {product.value}</h3>
                        </div>
                        <label>
                            <button onClick={() => setProductId(product.id, router)}>
                                <ArrowRight className='relative -bottom-4' />
                            </button>
                            
                        </label>
                    </div>
                </div>
            </div>
        )
}