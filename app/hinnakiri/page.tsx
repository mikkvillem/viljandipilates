import React from 'react';
import { promises as fs } from 'fs';
import { Product } from './types';
import PilatesLogoTransparent from '../../public/pilates_logo_transparent.png';
import Image from 'next/image';
import H1 from '@/components/typography/H1';

const pricingTitle = 'Hinnakiri';
const pricingSubtitle = 'Kehtiv alates 01. jaanuar 2022';

const PriceCard = ({ product }: { product: Product }) => {
  const { id, name, price, info } = product;

  const priceString = new Intl.NumberFormat('et-ET', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div
      className="relative flex sm:flex-col justify-start w-full sm:h-[288px] sm:w-[208px] text-center
      before:content-[''] before:absolute before:left-0 before:-z-10 before:w-full before:h-full 
      before:rounded-sm before:outline-8 before:outline-pallette-pink before:outline 
      bg-pallette-pink rounded-md border-dashed border-2 border-pallette-green
      "
    >
      <div className="py-2 sm:py-0 sm:px-2">
        <div className="flex items-center justify-center w-20 h-full border-r-2 border-dashed sm:p-4 sm:border-r-0 sm:border-b-2 sm:w-full border- border-pallette-green">
          <Image
            src={PilatesLogoTransparent}
            alt="Erika Viira Pilateseakadeemia logo"
            className="origin-center scale-150 -rotate-90 sm:scale-100 sm:rotate-0"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 py-8">
        <h2 className="relative text-xl font-bold font-merriweather-bold">{name}</h2>
        {info.length > 0 &&
          info.map((bullet, index) => (
            <p
              key={id + '_bullet_' + index}
              className="relative"
            >
              {bullet}
            </p>
          ))}
        <h3 className="relative text-6xl font-bold font-merriweather-bold">{priceString}</h3>
      </div>
    </div>
  );
};

const PricingPage = async () => {
  const file = await fs.readFile(process.cwd() + '/app/hinnakiri/pricing.json', 'utf8');
  const { products }: { products: Product[] } = JSON.parse(file);
  return (
    <>
      <H1>{pricingTitle}</H1>
      <p className="text-center sm:mt-2 md:mt-4 font-montserrat text-lg md:text-xl text-black max-w-2xl font-light">
        {pricingSubtitle}
      </p>
      <div className="flex flex-wrap justify-center w-full gap-4 mt-8">
        {products.map((product) => (
          <PriceCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default PricingPage;
