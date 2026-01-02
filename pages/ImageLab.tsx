
import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, Download, RefreshCw, AlertCircle, ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useAppContext } from '../context/AppContext';

const ImageLab: React.FC<{ initialImageUrl?: string, onNavigate: (page: string) => void }> = ({ initialImageUrl, onNavigate }) => {
  const { products } = useAppContext();
  const [sourceImage, setSourceImage] = useState<string>(initialImageUrl || products[0].image);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertImageUrlToBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      throw new Error("Unable to process the current image URL due to CORS or network issues. Try uploading a file instead.");
    }
  };

  const handleEdit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for the magic edit.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64ImageData = await convertImageUrlToBase64(sourceImage);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64ImageData,
                mimeType: 'image/jpeg',
              },
            },
            {
              text: `You are an expert AI photo editor. Apply the following modification to this image: "${prompt}". 
              Instructions:
              - If the user says "Add a retro filter", apply warm vintage tones and subtle film grain.
              - If the user says "Remove the person in the background", identify and remove any background distractors.
              - Always preserve the central product/gadget identity.
              - For Christmas/Festive requests, add high-quality holiday elements like snow, lights, or ornaments.`,
            },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setEditedImage(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("The elves couldn't generate the edit. Try simplifying your prompt.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="animate-in slide-in-from-left duration-700">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold font-luxury flex items-center gap-3">
            AI <span className="text-red-500">Magic</span> Lab <Sparkles className="text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-slate-400 mt-2">Reimagine your tech gear with professional Gemini 2.5 Flash Image editing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-8 animate-in fade-in duration-1000">
          <div className="bg-slate-900 rounded-[32px] p-8 border border-white/5 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold border-b border-white/5 pb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-red-500" /> Workbench
            </h3>
            
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-2">Edit Instructions</span>
                <textarea 
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-colors resize-none h-32 text-sm placeholder:text-slate-700"
                  placeholder="e.g. 'Add a retro filter', 'Put a Santa hat on it', 'Change background to a snowy mountain'..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </label>

              <div className="flex gap-2">
                <label className="flex-1">
                  <span className="hidden">Upload Image</span>
                  <div className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors border border-white/5">
                    <Upload className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Upload File</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </div>
                </label>
                <button 
                  onClick={() => { 
                    const randProduct = products[Math.floor(Math.random() * products.length)];
                    setSourceImage(randProduct.image); 
                    setEditedImage(null); 
                  }}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/5 transition-colors"
                  title="Try random product"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={handleEdit}
                disabled={isProcessing}
                className={`w-full py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                  isProcessing 
                  ? 'bg-slate-800 cursor-not-allowed text-slate-500' 
                  : 'bg-red-600 hover:bg-red-700 shadow-red-600/20 text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Baking Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Edit
                  </>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm animate-in shake-in duration-300">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/5">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Popular Edits</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Add a retro filter",
                  "Festive Christmas glow",
                  "Remove background",
                  "Add falling snow",
                  "Cyberpunk neon style",
                  "Classic BW"
                ].map((preset) => (
                  <button 
                    key={preset}
                    onClick={() => setPrompt(preset)}
                    className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-[10px] font-bold uppercase hover:border-red-500 transition-colors text-slate-400 hover:text-white"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Source View
              </span>
              <div className="bg-slate-900 rounded-[40px] overflow-hidden border border-white/5 aspect-square relative shadow-2xl group">
                <img src={sourceImage} alt="Source" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                   <p className="text-xs font-bold text-white/50 uppercase tracking-tighter">Current Canvas</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-sm font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Result
              </span>
              <div className="bg-slate-900 rounded-[40px] overflow-hidden border border-red-500/20 aspect-square relative flex items-center justify-center shadow-2xl group">
                {editedImage ? (
                  <>
                    <img src={editedImage} alt="Result" className="w-full h-full object-cover animate-in fade-in duration-1000" />
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <a 
                        href={editedImage} 
                        download="techhub-magic-edit.png"
                        className="p-4 bg-white text-slate-950 rounded-2xl flex items-center gap-2 font-bold shadow-2xl hover:bg-slate-200 transition-all transform active:scale-95"
                      >
                        <Download className="w-5 h-5" /> Download
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-8 space-y-4 opacity-40">
                    <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <Wand2 className="w-10 h-10 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm italic max-w-[200px] mx-auto leading-relaxed">Describe your vision on the left and let Gemini work its magic.</p>
                  </div>
                )}
                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-600 rounded-full animate-spin mx-auto"></div>
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-yellow-400 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-red-500 font-bold uppercase tracking-widest text-sm">Processing Pixels</p>
                        <p className="text-slate-500 text-[10px] uppercase">Using Gemini 2.5 Flash Image</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLab;
