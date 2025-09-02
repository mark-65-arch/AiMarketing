// Google Analytics 4 tracking functions

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters,
    });
  }
};

export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
    event_category: 'form_interaction'
  });
};

export const trackAIToolUsage = (toolName: string, action: string) => {
  trackEvent('ai_tool_usage', {
    tool_name: toolName,
    action: action,
    event_category: 'ai_tools'
  });
};

export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_TRACKING_ID', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};

export const trackBusinessGoal = (goalType: 'consultation_request' | 'ai_audit_request' | 'service_inquiry', value?: number) => {
  trackEvent('business_goal', {
    goal_type: goalType,
    event_category: 'conversion',
    value: value || 0
  });
};