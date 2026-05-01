export function BackgroundBlobs() {
  return (
    <>
      {/* Main gradient background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--background) 50%, var(--accent-50) 100%)',
        }}
      />
      
      {/* Diffuse blobs - Multiple small organic shapes */}
      <div 
        className="fixed top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--primary-300), transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      
      <div 
        className="fixed top-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--secondary-200), transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 25s ease-in-out infinite',
          animationDelay: '5s',
        }}
      />
      
      <div 
        className="fixed bottom-1/3 right-1/3 w-[600px] h-[600px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--accent-200), transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 30s ease-in-out infinite',
          animationDelay: '10s',
        }}
      />
      
      <div 
        className="fixed bottom-0 left-1/4 w-[450px] h-[450px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--primary-200), transparent 70%)',
          filter: 'blur(70px)',
          animation: 'float 22s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      
      <div 
        className="fixed top-1/2 right-0 w-[350px] h-[350px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--secondary-300), transparent 70%)',
          filter: 'blur(90px)',
          animation: 'float 28s ease-in-out infinite',
          animationDelay: '7s',
        }}
      />
    </>
  );
}
