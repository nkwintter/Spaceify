import { useEffect } from 'react';

//Essa  classe faz o redirecionamento do usuário/cliente para de volta ao Home dps que foi feita a autorização de  Login pelo Spotify

const SpotifyCallback = () => {
  useEffect(() => {
    // Extrair parametros da URL 
    const hash = window.location.hash.substring(1);
    const params = {};
    
    if (hash) {
      hash.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    }

    if (window.opener) {
      if (params.access_token) {
        window.opener.postMessage({
          type: 'spotify-auth-success',
          params: params
        }, window.location.origin);
      } else if (params.error) {
        window.opener.postMessage({
          type: 'spotify-auth-error',
          error: params.error
        }, window.location.origin);
      }
          
      window.close();
    } else {
      if (params.access_token) {
        // Salvar token no localStorage
        localStorage.setItem('@spotify_token', params.access_token);
        // Redirecionar para home LEMBRAR DE TROCAR PARA  O LINK DA NOSSA HOME
        window.location.href = '/';
      }
    }
  }, []);


//Praticidade  e estava dando erro no import desse styles
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