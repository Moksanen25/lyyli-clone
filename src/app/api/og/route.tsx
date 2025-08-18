import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Lyyli.ai - AI Communication Assistant';
    const description = searchParams.get('description') || 'Professional communication made simple with AI';

    // Organized styles object for better maintainability
    const styles = {
      container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '40px',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      backgroundPattern: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #2F5D50 0%, #00B4D8 100%)',
        opacity: 0.1,
      },
      logo: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#2F5D50',
        marginBottom: '20px',
        fontFamily: 'Playfair Display, serif',
      },
      title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#2F5D50',
        textAlign: 'center' as const,
        marginBottom: '16px',
        maxWidth: '800px',
        lineHeight: 1.2,
        fontFamily: 'Playfair Display, serif',
      },
      description: {
        fontSize: '18px',
        color: '#6C757D',
        textAlign: 'center' as const,
        maxWidth: '700px',
        lineHeight: 1.4,
      },
      brandAccent: {
        position: 'absolute' as const,
        bottom: '40px',
        right: '40px',
        width: '80px',
        height: '80px',
        backgroundColor: '#FF6B6B',
        borderRadius: '50%',
        opacity: 0.8,
      },
    };

    return new ImageResponse(
      (
        <div style={styles.container}>
          {/* Background Pattern */}
          <div style={styles.backgroundPattern} />
          
          {/* Logo */}
          <div style={styles.logo}>
            Lyyli.ai
          </div>
          
          {/* Title */}
          <div style={styles.title}>
            {title}
          </div>
          
          {/* Description */}
          <div style={styles.description}>
            {description}
          </div>
          
          {/* Brand Accent */}
          <div style={styles.brandAccent} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    // console.log(`${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
