// SpotifyCallback.jsx
import { useEffect } from 'react';

const SpotifyCallback = () => {
  useEffect(() => {
    // Extrair parâmetros da URL (hash fragment)
    const hash = window.location.hash.substring(1);
    const params = {};
    
    if (hash) {
      hash.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    }

    // Se esta janela foi aberta como popup
    if (window.opener) {
      if (params.access_token) {
        // Enviar sucesso para a janela pai
        window.opener.postMessage({
          type: 'spotify-auth-success',
          params: params
        }, window.location.origin);
      } else if (params.error) {
        // Enviar erro para a janela pai
        window.opener.postMessage({
          type: 'spotify-auth-error',
          error: params.error
        }, window.location.origin);
      }
      
      // Fechar popup
      window.close();
    } else {
      // Se não é popup, redirecionar para home com o token
      if (params.access_token) {
        // Salvar token no localStorage
        localStorage.setItem('@spotify_token', params.access_token);
        // Redirecionar para home
        window.location.href = '/';
      }
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>🎵 Conectando com Spotify...</h2>
        <p>Aguarde um momento...</p>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1db954',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite',
          margin: '20px auto'
        }}></div>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SpotifyCallback;