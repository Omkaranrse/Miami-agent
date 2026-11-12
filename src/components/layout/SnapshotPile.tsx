"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const SNAPSHOT_ITEMS = [
  {
    src: "/images/neighborhoods/coral-gables.jpg",
    caption: "Coral Gables",
    baseRotate: -6,
    hoverRotate: -2,
    offsetClass: "left-0",
    hoverY: -78,
    delay: 0,
  },
  {
    src: "/images/neighborhoods/key-biscayne.jpg",
    caption: "Key Biscayne",
    baseRotate: 5,
    hoverRotate: 1.5,
    offsetClass: "left-24 sm:left-28",
    hoverY: -86,
    delay: 0.08,
  },
];

export function SnapshotPile() {
  return (
    <div
      aria-label="Miami brokerage photo snapshots"
      className="pointer-events-none mx-auto hidden max-w-7xl px-4 sm:px-6 md:block lg:px-8"
    >
      <div className="relative h-0">
        <div className="pointer-events-auto absolute -top-12 right-12 flex items-end">
          {SNAPSHOT_ITEMS.map((item) => (
            <motion.div
              key={item.caption}
              initial={{ opacity: 0, y: 24, rotate: item.baseRotate }}
              whileInView={{ opacity: 1, y: 0, rotate: item.baseRotate }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                y: item.hoverY,
                rotate: item.hoverRotate,
                scale: 1.04,
                zIndex: 30,
              }}
              whileTap={{
                y: item.hoverY,
                rotate: item.hoverRotate,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                bounce: 0.22,
                duration: 0.55,
                delay: item.delay,
              }}
              className="relative -ml-5 w-[132px] cursor-pointer rounded-[12px] border border-white/95 bg-white p-1.5 pb-2.5 shadow-[0_14px_32px_-8px_rgba(36,23,72,0.3)] first:ml-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#EDE9F7]">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
              <p className="mt-1.5 flex items-center justify-center gap-1 font-sans text-[10px] font-semibold text-[#3B1E8A]">
                <MapPin className="h-2.5 w-2.5 text-[#683CE0]" />
                <span>{item.caption}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

