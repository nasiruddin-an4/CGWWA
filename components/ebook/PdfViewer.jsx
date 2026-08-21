'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export default function PdfViewer({ ebook }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const canvasRef = useRef(null);
  const pdfDocRef = useRef(null);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    // Inject PDF.js directly to completely bypass Next.js Webpack ESM bugs
    const loadPdfJs = async () => {
      if (window.pdfjsLib) {
        initPDF(ebook.pdfUrl);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        initPDF(ebook.pdfUrl);
      };
      script.onerror = () => {
        setError(true);
        setLoading(false);
      };
      document.body.appendChild(script);
    };

    loadPdfJs();
  }, [ebook.pdfUrl]);

  // Re-render when page number or scale changes
  useEffect(() => {
    if (pdfDocRef.current && !loading) {
      renderPage(pageNumber, scale);
    }
  }, [pageNumber, scale]);

  const initPDF = async (url) => {
    setLoading(true);
    setError(false);
    try {
      const loadingTask = window.pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      pdfDocRef.current = pdf;
      setNumPages(pdf.numPages);
      await renderPage(1, scale, pdf);
      setLoading(false);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError(true);
      setLoading(false);
    }
  };

  const renderPage = async (num, currentScale, pdf = null) => {
    const doc = pdf || pdfDocRef.current;
    if (!doc) return;
    
    // Prevent overlapping renders
    if (renderTaskRef.current) {
      await renderTaskRef.current.cancel();
    }
    
    try {
      const page = await doc.getPage(num);
      const viewport = page.getViewport({ scale: currentScale });
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;
      
      await renderTask.promise;
    } catch (err) {
      if (err.name !== 'RenderingCancelledException') {
        console.error('Error rendering page:', err);
      }
    }
  };

  const changePage = (offset) => {
    setPageNumber(prev => {
      const newPage = prev + offset;
      if (newPage < 1 || (numPages && newPage > numPages)) return prev;
      return newPage;
    });
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row bg-slate-50 w-full ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-screen flex-1'}`}>
      
      {/* Left Sidebar */}
      <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col shrink-0 z-20 shadow-sm relative overflow-y-auto">
        
        {/* Header Area */}
        <div className="p-6 border-b border-slate-100">
          <Link href="/ebook" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brandBlue transition-colors mb-6 group font-medium">
            <span className="p-1.5 bg-slate-100 rounded-full group-hover:bg-brandBlue/10 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </span>
            Back to Library
          </Link>
          
          <h1 className="font-bold text-slate-900 text-xl leading-tight mb-2">{ebook.title}</h1>
          {ebook.publishedYear && <p className="text-xs text-brandBlue font-bold tracking-widest uppercase">{ebook.publishedYear}</p>}
        </div>

        {/* Controls Area */}
        <div className="p-6 flex-1 flex flex-col gap-8">
          
          {/* Pagination */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Pages</h3>
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100">
              <button 
                onClick={() => changePage(-1)} 
                disabled={pageNumber <= 1 || loading}
                className="p-3 bg-white shadow-sm border border-slate-200 rounded-lg hover:border-brandBlue hover:text-brandBlue text-slate-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-slate-800">{pageNumber}</span>
                <span className="text-xs font-medium text-slate-400">of {numPages || '--'}</span>
              </div>
              
              <button 
                onClick={() => changePage(1)} 
                disabled={pageNumber >= (numPages || 1) || loading}
                className="p-3 bg-white shadow-sm border border-slate-200 rounded-lg hover:border-brandBlue hover:text-brandBlue text-slate-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Zoom */}
          <div className="hidden lg:block">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Zoom & View</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                <button 
                  onClick={() => setScale(s => Math.max(0.5, s - 0.2))} 
                  className="flex-1 flex items-center justify-center p-2.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="w-16 text-center text-sm font-bold text-brandBlue">{Math.round(scale * 100)}%</span>
                <button 
                  onClick={() => setScale(s => Math.min(3.0, s + 0.2))} 
                  className="flex-1 flex items-center justify-center p-2.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={toggleFullscreen} 
                className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-brandBlue hover:text-brandBlue text-slate-600 font-medium transition-all"
              >
                <Maximize className="w-4 h-4" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Right Panel: PDF Viewer Canvas Area */}
      <div className="flex-1 overflow-auto flex justify-center bg-[#eef2f6] p-4 sm:p-8 custom-scrollbar relative items-start">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="p-6 bg-white text-red-600 rounded-2xl border border-red-100 max-w-md text-center shadow-lg">
              <p className="font-bold mb-2 text-lg">Failed to load PDF</p>
              <p className="text-sm opacity-80">The document might be corrupted or inaccessible.</p>
            </div>
          </div>
        )}
        
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#eef2f6]/80 z-10 backdrop-blur-sm">
            <div className="p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center border border-slate-100">
              <Loader2 className="w-8 h-8 text-brandBlue animate-spin mb-4" />
              <p className="text-slate-600 font-medium">Rendering Page {pageNumber}...</p>
            </div>
          </div>
        )}
        
        <div className={`shadow-xl rounded-sm overflow-hidden bg-white transition-transform duration-300 min-h-[800px] flex items-center justify-center ${loading ? 'opacity-50 blur-sm scale-[0.98]' : 'opacity-100 blur-none scale-100'}`}>
          <canvas ref={canvasRef} className="block max-w-full h-auto" />
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #eef2f6; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}
