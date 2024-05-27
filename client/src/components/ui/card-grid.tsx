"use client";
import { Coin, LikeCardProps } from "@/app/interfaces";
import { cn } from "@/utils/cn";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { ChartModal } from "./chart-popup";

export const CardGrid = ({
  items,
  className,
}: {
  items: Coin[] | undefined;
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<Coin>();

  return (
    <>
      <div
        className={cn(
          `grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5  py-10 relative z-10 ${
            isChartOpen ? "blur-[10px]" : ""
          }`,
          className
        )}
      >
        {items?.map((item, idx) => (
          <Link
            href="#"
            key={item?.id}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.current_price}</CardDescription>
              <img
                className="w-16 absolute top-2 right-2"
                src={item.image}
              ></img>
              <LikeCard ClassName="absolute bottom-0 right-4" />
              <ChartButton
                ClassName="absolute bottom-0 right-12"
                onOpen={() => {
                  setIsChartOpen(true);
                  setSelectedChart(item);
                }}
              />
            </Card>
            {/* {isChartOpen ? <ChartModal setIsChartOpen={setIsChartOpen} coinName={item.name}  /> : null} */}
          </Link>
        ))}
      </div>
      {isChartOpen ? (
        <ChartModal setIsChartOpen={setIsChartOpen} coinData={selectedChart} />
      ) : null}
    </>
  );
};

export const LikeCard = ({ ClassName }: LikeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <FaHeart
      className={`${ClassName} text-green-700 cursor-pointer ${
        isLiked ? "fill-current" : "fill-white"
      }`}
      onClick={handleLikeClick}
    />
  );
};
export const ChartButton = ({
  ClassName,
  onOpen,
}: {
  ClassName: string;
  onOpen: () => void;
}) => {
  return (
    <FaChartLine
      className={`${ClassName} text-green-400 cursor-pointer`}
      onClick={onOpen}
    />
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 bg-black border border-transparent relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2 min-h-36">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        " text-wrap w-1/2 text-zinc-100 font-bold tracking-wide mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
