import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ArticleCardProps {
  id?: string;
  category: string;
  title: string;
  date: string;
  imageUrl: string;
  readTime?: string;
  summary?: string;
  onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  category,
  title,
  date,
  imageUrl,
  readTime = '3 min read',
  summary,
  onClick,
}) => {
  return (
    <article
      onClick={onClick}
      className="group flex flex-col gap-3.5 cursor-pointer bg-white rounded-[24px] border border-[#E5DFD5] hover:border-[#D8CFBF] hover:bg-[#FAF7F2] p-3.5 transition-all duration-200 select-none shadow-xs"
    >
      {/* 1. Large 16:9 Image with 20px rounded corners and border */}
      <div className="w-full aspect-16/9 rounded-[20px] overflow-hidden bg-[#EBEDF0] relative border border-[#E5DFD5]/70">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#1F1D1A] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 2. Text & Metadata Content */}
      <div className="flex flex-col px-1">
        {/* Category Pill Tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block text-[11px] font-bold text-[#E53935] uppercase tracking-wider">
            {category}
          </span>
          <span className="text-[#E5DFD5] text-xs">·</span>
          <span className="text-[11px] font-medium text-[#6B645D]">{readTime}</span>
        </div>

        {/* Title in Outfit / Google Sans style */}
        <h3 className="text-base sm:text-lg font-bold text-[#1F1D1A] leading-[1.3] mb-2 line-clamp-2 group-hover:text-[#1A73E8] transition-colors">
          {title}
        </h3>

        {/* Summary (if available) */}
        {summary && (
          <p className="text-xs text-[#6B645D] leading-[1.5] mb-2.5 line-clamp-2 font-normal">
            {summary}
          </p>
        )}

        {/* Date */}
        <span className="text-[11px] font-medium text-[#6B645D]">
          {date}
        </span>
      </div>
    </article>
  );
};
