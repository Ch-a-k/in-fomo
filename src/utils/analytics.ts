interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = (eventData: AnalyticsEvent) => {
  // Здесь можно добавить реальную интеграцию с Google Analytics или другой системой аналитики
  console.log('Analytics event:', eventData);
};

export default event; 