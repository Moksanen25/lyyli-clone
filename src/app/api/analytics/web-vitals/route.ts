import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log Web Vitals data (in production, you might want to send to analytics service)
    console.log('Web Vitals Report:', {
      metric: data.name,
      value: data.value,
      rating: data.rating,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString(),
      userAgent: data.userAgent,
    });

    // Here you could send to your analytics service:
    // - Google Analytics 4
    // - Mixpanel
    // - Custom analytics database
    // - etc.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Web Vitals reporting error:', error);
    return NextResponse.json({ error: 'Failed to report Web Vitals' }, { status: 500 });
  }
}
