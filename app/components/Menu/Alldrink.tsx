"use client";
import Image from "next/image";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import PaymentModal from "@/app/components/Shop/PaymentModal";

const pinacoladaItems = [
  { name: "Classic Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://www.craftzero.com.au/cdn/shop/files/Naked-Life-Non-Alcoholic-Passion-Martini-250ml-Craftzero-34617975800067.png?v=1779312807&width=1946" },
  { name: "Mango Piña Colada",   category: "Cocktail Blend", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-shot-white-background-png-image_18489148.webp" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-photography-png-image_18489142.webp" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://lyres.com/cdn/shop/files/USAUUKEU_Italian_Spritz_ROPP_white_background_with_drink_2.png?v=1767102009" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://lyres.com/cdn/shop/files/UKEU_RosaNegroniSet.png?v=1765471454" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://media.istockphoto.com/id/513932740/photo/coca-cola-fanta-and-sprite-can.jpg?s=612x612&w=0&k=20&c=dnCW_KVXX3Y9crN3TQ1zDHgKNqLLDy0k0djEnQMOt-M=" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://st.depositphotos.com/1024764/1853/i/450/depositphotos_18538825-stock-photo-group-of-various-soda-drinks.jpg" },
  { name: "Classic Piña Colada", category: "Coffee SEEKO", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://png.pngtree.com/png-clipart/20250224/original/pngtree-slushies-isolated-on-white-background-png-image_20505580.png" },
  { name: "Frozen Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "9,000៛ ($2.25)", img: "https://png.pngtree.com/png-vector/20240628/ourmid/pngtree-glass-of-aperol-spritz-cocktail-isolated-png-image_12915431.png" },
  { name: "Coconut Piña Colada", category: "Coffee SEEKO", date: "May 25, 2024", price: "9,500៛ ($2.40)", img: "https://thumbs.dreamstime.com/b/coca-cola-fanta-sprite-glass-bottles-chisinau-moldova-november-white-background-three-drinks-most-popular-brands-65196256.jpg" },
  { name: "Mango Piña Colada",   category: "Coffee SEEKO", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://png.pngtree.com/png-vector/20240524/ourmid/pngtree-fresh-lemon-soft-drink-in-aluminum-can-on-white-background-for-png-image_12492702.png" },
  { name: "Virgin Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-kUc3oO7rWNnWhrOcHkR8fG4kLN_Vi8pvHRk6IcOhJH_ok_IFMWVMpS2&s=10" },
  { name: "Virgin Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-shot-white-background-png-image_18489145.webp" },
  { name: "Classic Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://www.theisopurecompany.com/cdn/shop/files/US_Protein_Water_RTD_20OZ_StrawberryKiwi_6077850-Front.png?v=1768318059&width=2000" },
  { name: "Frozen Piña Colada",  category: "Cocktail Blend", date: "May 25, 2024", price: "9,000៛ ($2.25)", img: "https://static.gnc.com.ro/media/catalog/product/i/m/image20260304121005.png" },
  { name: "Coconut Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "9,500៛ ($2.40)", img: "https://8thwonder.com/cdn/shop/files/Ocho_Verde_Agave_Web01.png?v=1765307390&width=1200" },
  { name: "Mango Piña Colada",   category: "Cocktail Blend", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://zevia.com/cdn/shop/files/us_tea_GreenTea_Dry_NTWT.png?v=1755805015" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
  { name: "Classic Piña Colada", category: "Coffee SEEkO", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://getjoggy.com/cdn/shop/files/as_joggy_energy_cherry_lime_heroic_can_004.jpg?v=1757719019&width=1920" },
  { name: "Frozen Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "9,000៛ ($2.25)", img: "https://getjoggy.com/cdn/shop/files/as_joggy_energy_solar_mango_heroic_can_004.jpg?v=1757719019&width=1920" },
  { name: "Coconut Piña Colada", category: "Coffee SEEKO", date: "May 25, 2024", price: "9,500៛ ($2.40)", img: "https://thumbs.dreamstime.com/b/red-bull-energy-drink-isolated-white-background-red-bull-energy-drink-sold-red-bull-gmbh-austrian-company-created-191517596.jpg" },
  { name: "Mango Piña Colada",   category: "Coffee SEEKO", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://www.theisopurecompany.com/cdn/shop/files/US_32GRTD_500ML_Lemonade_6075766-2000x2000-064a3d6.png?v=1762189495&width=2000" },
  { name: "Virgin Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.theisopurecompany.com/cdn/shop/files/ip-1113513_Image_01.png?v=1766197794&width=4000" },
  { name: "Virgin Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.theisopurecompany.com/cdn/shop/files/US_32GRTD_500ML_GrapeFrost_6075764-2000x2000-064a3d6.png?v=1762189495&width=2000" },
  { name: "Virgin Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.theisopurecompany.com/cdn/shop/files/US_32GRTD_500ML_BlueRaspberry_6075763-2000x2000-064a3d6.png?v=1762189495&width=2000" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "2.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "7.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "11.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "6.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://woodencork.com/cdn/shop/products/Grapefruit.png?v=1685195095.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://cityhive-production-cdn.cityhive.net/products/610318e0aa07e87e8c9bffff/larger.png" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://thekit.ca/wp-content/uploads/2022/06/2022-entertaining-canned-cocktails-thekit.ca-inline-4.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/16/01/1e735cf74a1d9a63b9d4f995aa3f/truly-poolsidehardseltzer-12pk-660x660._TTW_._CR0,0,660,660_._SR580,580_._QL100_.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.instacart.com/assets/domains/product-image/file/large_60015b9e-aa33-42d6-8a69-d586b3366e7a.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.instacart.com/assets/domains/product-image/file/large_9d45b31d-b3b5-45d4-8f25-abd15bbbee34.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://images.gopuff.com/blob/gopuffcatalogstorageprod/catalog-images-container/resize/cf/version=1_2,format=auto,fit=scale-down,width=800,height=800/8dd3388f-4227-476c-9e1c-fed3b4c0cefa.png" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://images.gopuff.com/blob/gopuffcatalogstorageprod/catalog-images-container/resize/cf/version=1_2,format=auto,fit=scale-down,width=800,height=800/c6b62e7b-9854-4121-9360-85db73167b3e.png" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://images.gopuff.com/blob/gopuffcatalogstorageprod/catalog-images-container/resize/cf/version=1_2,format=auto,fit=scale-down,width=800,height=800/94d65d95-8268-4735-8c00-bbb511e2a28d.png" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://images.gopuff.com/blob/gopuffcatalogstorageprod/catalog-images-container/resize/cf/version=1_2,format=auto,fit=scale-down,width=800,height=800/13c6a158-cb48-4644-89a2-a582111405ad.png" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://d2iiahg0ip5afn.cloudfront.net/media/simply-spiked-lemonade/images/659216704.simply-12oz-2024-spikedlimeade-passionfruit.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://images.albertsons-media.com/is/image/ABS/970726497-ECOM?$ng-ecom-pdp-mobile$&defaultImage=Not_Available" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://tb-static.uber.com/prod/image-proc/processed_images/e0ca50fff8a3df50719f61f161d6ca6e/e0b5f48f76ed66702f2c6f7df0cab2dd.jpeg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://i5.walmartimages.com/seo/Smirnoff-Ice-Smash-Red-White-Berry-23-5-fl-oz-Single-Serve-Can-8-ABV_eb74990d-5873-4f23-a8a9-279e70359b98.6e33585bbaa737fee74a11ec1cd1130b.jpeg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://applejack.com/site/images/Tip-Top-Proper-Cocktails-Margarita-100-ml_1.png" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://d31f1ehqijlcua.cloudfront.net/n/8/c/f/a/8cfa8c9d5ff491a9c155810c841ecec470192920_Drinks_177_04.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.welchscraftcocktails.com/wp-content/uploads/65f9ca1be6e6f437ed39702a_WCC-Vodka-Cranberry.png" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://m.media-amazon.com/images/I/716lHNIZTRL.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://images.gotoliquorstore.com/product/1000014446/b61eaef3-292c-46b7-ab47-d8b164065e31_510_m.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/640w/products/4985/5216/welchs-craft-cocktails-vodka-transfusion-ready-to-drink-4-pack-12oz-cans__23915.1754742146.1280.1280__78836.1.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://68136a0cdc4fc8e03144-4f53ad8a42f2ace069a6df50c7ca2a3d.ssl.cf2.rackcdn.com/fb59ee37-9ccd-476c-810f-9f15f165cd1f_large.jpg" },
  { name: "coffee",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://i5.walmartimages.com/seo/Smirnoff-Ice-Smash-Pink-Lemonade-23-5-fl-oz-Single-Serve-Can-8-ABV_a90270d8-3d96-46ea-92fb-4b789cdf964e.5987155d54c521068fdc9174d26f7406.jpeg" },
];


export default function Pinacolada() {
  const [buying, setBuying] = useState<{ name: string; price: string; img: string; category: string } | null>(null);

  return (
    <>
      <div className="bg-white py-4 xl:py-6 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
            GRID CONFIGURATION:
            grid-cols-2: 2 columns on mobile
            md:grid-cols-3: 3 columns on tablet
            xl:grid-cols-4: 4 columns on desktop
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {pinacoladaItems.map((p, i) => (
            <div key={i} className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                <span className="absolute top-2 left-2 z-10 text-[9px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-md">NEW</span>
                <Image src={p.img} alt={p.name} fill className="object-contain p-3" unoptimized />
              </div>
              <div className="flex flex-col flex-1 p-3">
                <h3 className="text-xs md:text-sm font-extrabold text-gray-800 leading-snug line-clamp-1">{p.name}</h3>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold mt-0.5">{p.category}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-green-500 font-black text-xs md:text-sm">{p.price}</span>
                  <button onClick={() => setBuying({ name: p.name, price: p.price, img: p.img, category: p.category })} className="bg-amber-50 text-amber-500 p-1.5 rounded-lg hover:bg-amber-500 hover:text-white transition-colors">
                    <FiShoppingCart size={14} />
                  </button>
                </div>
                <p className="text-[8px] text-gray-300 mt-1">Arrived: {p.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {buying && <PaymentModal product={buying} onClose={() => setBuying(null)} />}
    </>
  );
}