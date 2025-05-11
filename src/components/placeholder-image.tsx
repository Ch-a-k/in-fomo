interface PlaceholderImageProps {
  text?: string
  className?: string
}

export default function PlaceholderImage({ text = 'Image', className = 'h-64' }: PlaceholderImageProps) {
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-black ${className}`}>
      <span className="text-4xl font-bold text-orange-500">{text.charAt(0)}</span>
    </div>
  )
} 