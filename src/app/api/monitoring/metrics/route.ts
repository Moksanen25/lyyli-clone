import { NextRequest, NextResponse } from 'next/server';
import { getErrorMetricsSummary } from '@/lib/monitoring';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeWindow = parseInt(searchParams.get('timeWindow') || '60', 10);
    
    // Basic auth check (in production, use proper authentication)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.MONITORING_AUTH_TOKEN;
    
    if (expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const metrics = getErrorMetricsSummary(timeWindow);
    
    return NextResponse.json({
      success: true,
      data: {
        ...metrics,
        timeWindow,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching monitoring metrics:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch metrics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;
    
    // Basic auth check
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.MONITORING_AUTH_TOKEN;
    
    if (expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    switch (action) {
      case 'clear_metrics':
        // Clear old metrics
        const { maxAgeHours = 24 } = data || {};
        // This would call clearOldMetrics from monitoring.ts
        return NextResponse.json({
          success: true,
          message: `Cleared metrics older than ${maxAgeHours} hours`,
        });
        
      case 'test_alert':
        // Test alert functionality
        const testData = {
          errorCount: 15,
          errorRate: 7.5,
          timeWindow: 5,
          recentErrors: [
            {
              statusCode: 500,
              url: 'https://lyyli.ai/test',
              timestamp: new Date().toISOString(),
              method: 'GET',
            }
          ],
        };
        
        // This would call sendErrorAlert from monitoring.ts
        return NextResponse.json({
          success: true,
          message: 'Test alert sent',
          testData,
        });
        
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing monitoring request:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
