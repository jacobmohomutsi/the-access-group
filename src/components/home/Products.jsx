
"use client";
import React, { useState } from 'react';
import ProposalOffcanvas from '../common/ProposalOffcanvas';


export default function Products({ productsData }) {
  const data = productsData;
  console.log(productsData);
  const products = [
    {
      title: data.product1Title,
      price: data.product1Price,
      description: data.product1Description,
      features: data.product1Feature
        ?.split("\n")
        .filter(Boolean),
    },

    {
      title: data.product2Title,
      price: data.product2Price,
      description: data.product2Description,
      features: data.product2Feature
        ?.split("\n")
        .filter(Boolean),
    },

    {
      title: data.product3Title,
      price: data.product3Price,
      description: data.product3Description,
      features: data.product3Feature
        ?.split("\n")
        .filter(Boolean),
    },

    {
      title: data.product4Title,
      price: data.product4Price,
      description: data.product4Description,
      features: data.product4Feature
        ?.split("\n")
        .filter(Boolean),
    },

    {
      title: data.product5Title,
      price: data.product5Price,
      description: data.product5Description,
      features: data.product5Feature
        ?.split("\n")
        .filter(Boolean),
    },

    {
      title: data.product6Title,
      price: data.product6Price,
      description: data.product6Description,
      features: data.product6Feature
        ?.split("\n")
        .filter(Boolean),
    },

    {
      title: data.product7Title,
      price: data.product7Price,
      description: data.product7Description,
      features: data.product7Feature
        ?.split("\n")
        .filter(Boolean),
    },

    {
      title: data.product8Title,
      price: data.product8Price,
      description: data.product8Description,
      features: data.product8Feature
        ?.split("\n")
        .filter(Boolean),
    },
  ];

  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <section id="products" className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
              {data.eyebrow}
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {data.title}
            </h2>

            <p className="mt-4 text-lg leading-8 text-white/65">
              {data.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {index + 1}
                  </h3>

                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-start justify-start gap-4">
                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/65">
                  {item.description}
                </p>

                <ul className="mt-2 space-y-3 mb-4 text-sm text-white/80">
                  {item.features?.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(item.title);
                    setOffcanvasOpen(true);
                  }}
                  className="mt-auto inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-primary shadow-lg shadow-white/20 hover:bg-secondary"
                >
                  Request Proposal
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ProposalOffcanvas isOpen={offcanvasOpen} onClose={() => setOffcanvasOpen(false)} product={selectedProduct} />
    </>
  );
}
