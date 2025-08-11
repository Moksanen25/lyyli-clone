import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Lyyli.ai';
    const description = searchParams.get('description') || 'AI Communication Assistant for Professional Service Organizations';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            padding: '40px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #2F5D50 0%, #00B4D8 100%)',
              opacity: 0.1,
            }}
          />
          
          {/* Logo */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#2F5D50',
              marginBottom: '20px',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Lyyli.ai
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#2F5D50',
              textAlign: 'center',
              marginBottom: '16px',
              maxWidth: '800px',
              lineHeight: 1.2,
              fontFamily: 'Playfair Display, serif',
            }}
          >
            {title}
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: '18px',
              color: '#6C757D',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
          
          {/* Brand Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              width: '80px',
              height: '80px',
              backgroundColor: '#FF6B6B',
              borderRadius: '50%',
              opacity: 0.8,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.log(`${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
