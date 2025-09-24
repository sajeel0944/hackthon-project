interface HeroProps{
  tilte: string
  subTitle: string;
  discribtion: string;
}


export default function Hero({tilte, subTitle, discribtion}: HeroProps) {
  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-900">
      <div className="container mx-auto px-4 py-16 ">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block bg-blue-50 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
            {tilte}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {subTitle}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            {discribtion}
          </p>
        </div>
      </div>
    </div>
  );
}
