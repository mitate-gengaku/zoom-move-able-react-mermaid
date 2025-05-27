import { RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

interface Props {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

export const Toolbar = ({ zoomIn, zoomOut, reset }: Props) => (
  <div className="absolute top-2 left-2 z-10 flex gap-1 bg-white rounded-md shadow-lg border p-1">
    <button
      onClick={zoomIn} 
      className="p-2 hover:bg-gray-100 rounded transition-colors" title="拡大">
      <ZoomInIcon size={16} />
    </button>
    <button
      onClick={zoomOut}
      className="p-2 hover:bg-gray-100 rounded transition-colors" title="縮小">
      <ZoomOutIcon size={16} />
    </button>
    <button
      onClick={reset}
      className="p-2 hover:bg-gray-100 rounded transition-colors" title="リセット">
      <RotateCcwIcon size={16} />
    </button>
  </div>
)