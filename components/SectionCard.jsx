import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const SectionCard = ({
  title,
  titleBn,
  category,
  categoryBn,
  description,
  descriptionBn,
  image,
  icon,
  date,
  link,
  badge,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-md border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Image Thumbnail if provided */}
      {image && (
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[11px] font-bold tracking-wider uppercase border border-slate-700/80">
              {category}
            </span>
          )}

          {badge && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold shadow-sm">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {!image && category && (
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-bold uppercase">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {category}
              </span>
              {date && <span className="text-[11px] text-slate-400 font-medium">{date}</span>}
            </div>
          )}

          {icon && !image && (
            <div className="w-10 h-10 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              {icon}
            </div>
          )}

          <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mt-2 font-semibold">
            {description}
          </p>
        </div>

        {/* Action Link Footer */}
        {link && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {date && image && <span className="text-xs text-slate-400 font-medium">{date}</span>}
            <Link
              href={link || '#'}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-900 group-hover:translate-x-1 transition-all ml-auto"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
