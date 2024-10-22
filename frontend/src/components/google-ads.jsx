import React, { useEffect } from 'react';

const GoogleAds = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1522586714025957';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-1522586714025957"
         data-ad-slot="8204985236"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default GoogleAds;
