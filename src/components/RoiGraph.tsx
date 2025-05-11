import dynamic from 'next/dynamic';

interface RoiGraphProps {
  isAnimated: boolean;
  translations: {
    beforeChartTitle: string;
    afterChartTitle: string;
    timeSpent: string;
    revenue: string;
  };
}

function RoiGraphComponent({ isAnimated, translations }: RoiGraphProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="bg-light-surface dark:bg-dark-bg p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">{translations.beforeChartTitle}</h3>
        <div className="relative h-80 w-full">
          {/* Before Bot Implementation Chart */}
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-0 w-full h-full px-4 pb-4">
              {/* Y-axis labels */}
              <div className="absolute h-full flex flex-col justify-between text-xs text-gray-500 -left-2">
                <span>High</span>
                <span>Medium</span>
                <span>Low</span>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute w-full bottom-0 flex justify-between text-xs text-gray-500 pb-4">
                <span>Low</span>
                <span>{translations.timeSpent}</span>
                <span>High</span>
              </div>
              
              {/* X-axis */}
              <div className="absolute bottom-8 left-6 w-[calc(100%-2rem)] h-0.5 bg-gray-300"></div>
              
              {/* Y-axis */}
              <div className="absolute bottom-8 left-6 w-0.5 h-[calc(100%-2rem)] bg-gray-300"></div>
              
              {/* Revenue Before Bot - Rising Line */}
              <div className="absolute bottom-8 left-6 w-[calc(100%-2rem)] h-[calc(100%-2rem)]">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M0,80 C20,70 40,50 100,10"
                    stroke="rgba(220, 38, 38, 0.5)"
                    strokeWidth="3"
                    fill="none"
                    className={`transition-all duration-1000 ease-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
                    strokeDasharray="180"
                    strokeDashoffset={isAnimated ? "0" : "180"}
                  />
                  <text x="60" y="30" fill="rgba(220, 38, 38, 0.8)" fontSize="6" className={`transition-opacity duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
                    Before Bot
                  </text>
                </svg>
              </div>
              
              {/* Revenue Label */}
              <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700 dark:text-gray-300">
                {translations.revenue}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-light-surface dark:bg-dark-bg p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">{translations.afterChartTitle}</h3>
        <div className="relative h-80 w-full">
          {/* After Bot Implementation Chart */}
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-0 w-full h-full px-4 pb-4">
              {/* Y-axis labels */}
              <div className="absolute h-full flex flex-col justify-between text-xs text-gray-500 -left-2">
                <span>High</span>
                <span>Medium</span>
                <span>Low</span>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute w-full bottom-0 flex justify-between text-xs text-gray-500 pb-4">
                <span>Low</span>
                <span>{translations.timeSpent}</span>
                <span>High</span>
              </div>
              
              {/* X-axis */}
              <div className="absolute bottom-8 left-6 w-[calc(100%-2rem)] h-0.5 bg-gray-300"></div>
              
              {/* Y-axis */}
              <div className="absolute bottom-8 left-6 w-0.5 h-[calc(100%-2rem)] bg-gray-300"></div>
              
              {/* Revenue After Bot - Rising Line with Less Time */}
              <div className="absolute bottom-8 left-6 w-[calc(100%-2rem)] h-[calc(100%-2rem)]">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Time spent line (decreasing) */}
                  <path
                    d="M0,80 C10,60 20,30 40,20"
                    stroke="rgba(59, 130, 246, 0.7)"
                    strokeWidth="3"
                    fill="none"
                    className={`transition-all duration-1000 ease-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
                    strokeDasharray="120"
                    strokeDashoffset={isAnimated ? "0" : "120"}
                  />
                  <text x="15" y="30" fill="rgba(59, 130, 246, 0.8)" fontSize="6" className={`transition-opacity duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
                    {translations.timeSpent}
                  </text>
                  
                  {/* Revenue line (increasing) */}
                  <path
                    d="M0,80 C20,50 40,30 100,0"
                    stroke="rgba(16, 185, 129, 0.7)"
                    strokeWidth="3"
                    fill="none"
                    className={`transition-all duration-1500 ease-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
                    strokeDasharray="180"
                    strokeDashoffset={isAnimated ? "0" : "180"}
                  />
                  <text x="60" y="10" fill="rgba(16, 185, 129, 0.8)" fontSize="6" className={`transition-opacity duration-1500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
                    {translations.revenue}
                  </text>
                </svg>
              </div>
              
              {/* Revenue Label */}
              <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700 dark:text-gray-300">
                {translations.revenue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Используем dynamic для исключения SSR
const RoiGraph = dynamic(() => Promise.resolve(RoiGraphComponent), {
  ssr: false
});

export default RoiGraph; 