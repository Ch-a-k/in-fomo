import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';

// Типы для данных графика
type ChartDataItem = {
  name: string;
  managerTime: number;
  revenue: number;
  botMangerTime: number;
  botRevenue: number;
};

// Расширенные пропсы с переведенными строками
interface BusinessChartsProps {
  chartData: ChartDataItem[];
  translations: {
    beforeBot: string;
    afterBot: string;
    managerTime: string;
    revenue: string;
  };
}

// Создаем компонент, который будет рендериться только на клиенте
function BusinessChartsComponent({ chartData, translations }: BusinessChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <div className="bg-light-surface dark:bg-dark-bg p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-center">
          {translations.beforeBot}
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="managerTime" 
                name={translations.managerTime} 
                stroke="#f97316" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name={translations.revenue} 
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-light-surface dark:bg-dark-bg p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-center">
          {translations.afterBot}
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="botMangerTime" 
                name={translations.managerTime} 
                stroke="#f97316" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="botRevenue" 
                name={translations.revenue}
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Используем dynamic для исключения SSR
const BusinessCharts = dynamic(() => Promise.resolve(BusinessChartsComponent), {
  ssr: false
});

export default BusinessCharts; 