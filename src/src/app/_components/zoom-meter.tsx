interface Props {
  zoom: number;
}

export const ZoomMeter = ({ zoom }: Props) => (
  <div className="absolute top-2 right-2 z-10 bg-white rounded-md shadow-lg border px-2 py-1 text-sm">
    {Math.round(zoom * 100)}%
  </div>
)